<template>
  <transition name="fall" mode="out-in">

    <loading pic="loading" v-if="loadingState" key="1" />

    <div v-else class="schedule__wrapper" key="2">

      <form @submit.prevent="addPayment()" method="post" class="user__form">

        <div class="input__group ">
          <div class="input__field">
            <label for="name">Godina</label>
            <input type="number" name="name" placeholder="godina" 
                    class="login_input user_input" v-model="paymentInput.payment_year">
          </div>

          <div class="input__field">
            <label for="days">Mjesec</label>
            <div class="login_input user_input ">
              <select name="days" id="days" class="" required
                      v-model="paymentInput.payment_month" 
                      :value="paymentInput.payment_month" >
                <option value="Januar">Januar</option>
                <option value="Februar">Februar</option>
                <option value="Mart">Mart</option>
                <option value="April">April</option>
                <option value="Maj">Maj</option>
                <option value="Jun">Jun</option>
                <option value="Jul">Jul</option>
                <option value="Avgust">Avgust</option>
                <option value="Septembar">Septembar</option>
                <option value="Oktobar">Oktobar</option>
                <option value="Novembar">Novembar</option>
                <option value="Decembar">Decembar</option>
              </select>
            </div>
          </div>

          <div class="input__field">
            <label for="price">Cijena</label>
            <input type="number" id="price" placeholder="cijena" value="35" required
                    class="login_input user_input" v-model="paymentInput.price">
          </div>

          <div class="input__field">
            <label for="datePicker">Datum plaćanja</label>
            <datepicker v-model="paymentInput.payment_date" 
                        placeholder="datum plaćanja" 
                        class="login_input user_input"
                        :language="sr">
            </datepicker>
          </div>

          <div class="att_totals">
            <h4>Ukupno: {{ totalToPay() }}</h4>
            <h4>Plaćeno: {{ totalPayed() }}</h4>
          </div>
        </div>
        
        <div class="members__list">

          <div class="members__items">

            <div class="clients__ss search_group">
            <div class="search__bar">
              <svg version="1.1" id="Layer_1" x="0px" y="0px" height="30px" viewBox="0 0 297.888 297.888">
                <g>
                  <path class="svg__parts" style="fill:var(--purple);" d="M218.971,187.618c8.659,8.658,8.659,22.695,0,31.354c-8.657,8.658-22.694,8.657-31.352,0
                    l-50.096-50.096c-8.657-8.658-8.659-22.695-0.001-31.353c8.659-8.659,22.696-8.658,31.355,0L218.971,187.618z"/>
                  <circle class="svg__parts" style="fill:var(--purple);" cx="100.697" cy="100.697" r="100.697"/>
                  <circle class="svg__parts" style="fill:var(--purple-light);" cx="100.697" cy="100.697" r="64.794"/>
                  <path class="svg__parts" style="fill:var(--purple);" d="M186.271,233.504c-13.044-13.042-13.044-34.191,0-47.234c13.043-13.044,34.19-13.043,47.234,0
                    l54.6,54.601c13.044,13.043,13.044,34.19,0,47.234c-13.042,13.043-34.19,13.043-47.234,0L186.271,233.504z"/>
                </g>
              </svg>
              <input type="text" name="search" id="search" @keyup="searchClients()"
                      v-model="search" class="login_input search_input" placeholder="traži (ime, prezime, tel.)">
            </div>

            <div class="page__size">
              <label for="days">Prikaži</label>
              <div class="login_input user_input nr_clients">
                <select name="days" id="days" class=""
                        v-model="pageSize" 
                        :value="pageSize" 
                        @change="setPageSize()">
                  <option :value="Number(10)">10</option>
                  <option :value="Number(20)">20</option>
                  <option :value="Number(50)">50</option>
                  <option :value="Number(1000)">sve</option>
                </select>
              </div>
              <label for="days">vježbačica</label>
            </div>
          </div>

            <div class="days__list payments__list">
              <span>Vježbačica</span>
              <span>Datum</span>
              <span>Iznos</span>
              <span>Napomena</span>
            </div>

            <div v-for="member in pageOfItems" :key="member._id" name="member"
                class="members_input att_members">
              <div class="att_member">
                {{ paymentInput.members.map(item => item.client._id).indexOf(member.client._id) + 1 }}
                {{ member.client.last_name }}, {{ member.client.first_name }}
              </div>
              <datepicker v-model="member.payment_date" 
                      placeholder="datum plaćanja" 
                      class="login_input user_input"
                      :language="sr">
              </datepicker>
              <input type="number" v-model="member.payment_amount" class="login_input user_input payment__price"> 
              <input type="text" v-model="member.note" class="login_input user_input payment__note">
            </div>
          </div>
        </div>

        <jw-pagination :items="filteredClients" @changePage="onChangePage" 
                        :initialPage="initialPage" :pageSize="pageSize" 
                        :labels="customLabels" :styles="customStyles" class="pagine">
        </jw-pagination>

        <action-buttons toForm='payments' />

        <button type="submit" @click.prevent="delClient()"
                class="action_btn delete__btn">
          <svg version="1.1" id="Layer_1" x="0px" y="0px" height="25px" 
              viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
            <rect x="114.402" y="220.724" style="fill:#CEE8FA;" width="274.813" height="276.96"/>
            <g>
              <path style="fill:var(--red-dark);" d="M182.746,422.305c-7.905,0-14.313-6.409-14.313-14.313v-91.604c0-7.904,6.408-14.313,14.313-14.313
                c7.905,0,14.313,6.409,14.313,14.313v91.604C197.06,415.895,190.652,422.305,182.746,422.305z"/>
              <path style="fill:var(--red-dark);" d="M251.808,422.305c-7.905,0-14.313-6.409-14.313-14.313v-91.604c0-7.904,6.408-14.313,14.313-14.313
                c7.905,0,14.313,6.409,14.313,14.313v91.604C266.121,415.895,259.713,422.305,251.808,422.305z"/>
              <path style="fill:var(--red-dark);" d="M320.869,422.305c-7.905,0-14.313-6.409-14.313-14.313v-91.604c0-7.904,6.408-14.313,14.313-14.313
                c7.905,0,14.313,6.409,14.313,14.313v91.604C335.182,415.895,328.774,422.305,320.869,422.305z"/>
              <path style="fill:var(--red-dark);" d="M434.571,135.961c-8.435-13.251-21.524-22.423-36.856-25.828
                c-7.712-1.722-15.362,3.152-17.076,10.869c-1.713,7.718,3.153,15.361,10.869,17.076c7.869,1.749,14.585,6.455,18.913,13.255
                c4.328,6.8,5.75,14.879,4.002,22.748l-7.423,33.418L99.603,139.224l7.423-33.42c3.608-16.243,19.754-26.519,36.002-22.917
                l145.2,32.249c7.713,1.713,15.361-3.153,17.076-10.869c1.713-7.718-3.153-15.361-10.869-17.076l-82.44-18.309l8.327-37.493
                l122.96,27.308l-11.431,51.467c-1.713,7.718,3.153,15.361,10.869,17.076c1.045,0.232,2.088,0.344,3.116,0.344
                c6.563,0,12.478-4.542,13.96-11.213l14.534-65.44c0.823-3.706,0.14-7.587-1.898-10.789c-2.038-3.202-5.266-5.463-8.972-6.286
                L212.555,0.342c-7.713-1.709-15.362,3.152-17.076,10.869l-11.43,51.466l-34.815-7.732C117.579,47.909,86.11,67.948,79.079,99.6
                l-10.526,47.391c-1.713,7.718,3.153,15.361,10.869,17.076l190.666,42.347H114.402c-7.905,0-14.313,6.409-14.313,14.313v276.96
                c0,7.904,6.408,14.313,14.313,14.313h274.81c7.905,0,14.313-6.409,14.313-14.313V236.049l11.243,2.498
                c1.026,0.229,2.067,0.341,3.103,0.341c2.701,0,5.37-0.764,7.686-2.239c3.202-2.038,5.463-5.266,6.288-8.972l10.526-47.391
                C445.776,164.954,443.006,149.212,434.571,135.961z M374.9,483.374H128.716V235.04H374.9V483.374z"/>
            </g>
          </svg>
          <p>Obriši</p>
        </button>

      </form>

    </div>
  </transition>
</template>

<script>
  import moment from 'moment';
  import { mapGetters, mapActions } from 'vuex';
  import Datepicker from 'vuejs-datepicker';
  import {sr} from 'vuejs-datepicker/dist/locale';
  import Loading from '@/components/utils/Loading.vue';
  import ActionButtons from '@/components/utils/ActionButtons.vue';
  import actionsNotify from '../mixins/actionsNotify';
  import { customLabels, customStyles } from '@/components/utils/pageNav.js';

  export default {
    name: 'Payment',

    components: {
      Loading, 
      Datepicker, 
      ActionButtons,
    },

    mixins: [actionsNotify],

    data() {
      return {
        sr: sr,
        search: '',
        filteredClients: [],
        pageOfItems: [],
        initialPage: 1,
        pageSize: 10,
        customLabels,
        customStyles,
        paymentInput: {
          payment_year: moment(new Date).format('YYYY'),
          payment_month: '',
          payment_date: new Date,
          price: 35,
          notes: '',
          members: []
        },
        year: 0,
        notClients: [],
        selectedDate: new Date,
        appeared: false,
      }
    },

    watch: {
      pageSize() { 
        this.searchClients() 
      }
    },

    computed: {
      ...mapGetters([ 'getAllPayments', 
                      'getOnePayment',
                      'getAllClients',
                      'getClientsPageSize',
                      'getErrors',
                      'getPrice',
                      'loadingState' ]),
    },

    methods: {
      ...mapActions([ 'paymentAdd', 
                      'paymentUpdate', 
                      'paymentDelete',
                      'fetchClients',
                      'fetchClientsPageSize',
                      'formTypeChange',
                      'clearErrors',
                      'setLoadingState' ]),

      onChangePage(pageOfItems) {
        this.pageOfItems = pageOfItems;
      },

      setPageSize() {
        this.fetchClientsPageSize(this.pageSize);
      },

      searchClients() {
        this.initClients();
        let mu = this.paymentInput.members.filter(post => {
          return post.client.first_name.toLowerCase().includes(this.search.toLowerCase()) || 
                  post.client.last_name.toLowerCase().includes(this.search.toLowerCase()) || 
                  post.client.mobile.includes(this.search)
        });
        this.filteredClients = mu;
      },

      totalToPay() {
        return this.filteredClients.length * this.paymentInput.price
      },

      totalPayed() {
        return this.filteredClients.reduce((a, {payment_amount}) => a + Number(payment_amount), 0)
      },

      async addPayment() {
        this.setLoadingState(true);
        if (this.getOnePayment._id) {
          await this.paymentUpdate(this.paymentInput);
        } else {
          await this.paymentAdd(this.paymentInput);
        }
        this.setLoadingState(false);
        if (this.getErrors.length) {
          this.$toast.error('Greška! ' + this.getErrors, 'OK', this.notificationSystem.options.error);
          this.clearErrors();
        } else {
          this.$toast.success('Uspješno sačuvano!', 'OK', this.notificationSystem.options.success);
          this.formTypeChange('payments');
        }
      },

      addAllmembers() {
        for (let i = 0; i < this.getAllClients.filter(active => active.active !== false).length; i++) {
          this.paymentInput.members.push({
            'client':this.getAllClients.filter(active => active.active !== false)[i], 
            'payment_date':this.selectedDate, 
            'payment_amount': this.paymentInput.price, 
            'note': ''
          })
        }
        this.notClients = [];
      },

      mapMembers() {
        return this.paymentInput.members.map(item => {
            let container = {};
            container = item.client;
            return container;
        });
      },

      async delEx() {
        await this.paymentDelete(this.getOnePayment);
        this.formTypeChange('payments');
      },

      initClients() {
        if (this.getOnePayment._id) {
          this.paymentInput = this.getOnePayment;
          this.notClients = this.getAllClients.filter((elem) => !this.mapMembers().find(({ _id }) => elem._id === _id));
        } else {
          this.notClients = this.getAllClients.filter(active => active.active !== false);
          this.paymentInput.price = this.getPrice;
          this.paymentInput.members = [];
          this.addAllmembers();
        }
        if (this.getClientsPageSize !== 10) this.pageSize = this.getClientsPageSize;
      }
    },

    async mounted() {
      let currentYear = new Date();
      currentYear = moment().format('YYYY');
      this.year = currentYear;
      await this.fetchClients();
      this.initClients();
      this.filteredClients = this.paymentInput.members;
      this.setLoadingState(false);
    },
  }
</script>

<style>
  .payments__list {
    justify-items: center;
    margin-top: 1;
  }

  .select__month {
    font-family: 'Itim', cursive;
  }

  .payment__price {
    width: 3.3em;
  }

  .payment__note {
    width: 10em;
  }

  .for__payment_list {
    cursor: none;
  }
</style>
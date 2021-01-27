<template>
  <transition name="fall" mode="out-in">

    <loading pic="loading" v-if="loadingState" key="1" />

    <div v-else class="schedule__wrapper" key="2">

      <form @submit.prevent="addPayment()" method="post" class="user__form">

        <h3 v-if="!getOnePayment._id" class="new_item">NOVA PLAĆANJA</h3>

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

            <search-bar :searchStr="search" 
                      :pageSizeNr="pageSize"
                      @changed="setPageSize"
                      @typed="searchClients" />

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

        <div class="modify_btns">
          <action-buttons toForm='payments' />
          <delete-button @clicked="delClient()" />
        </div>

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
  import SearchBar from '@/components/utils/SearchBar.vue';
  import ActionButtons from '@/components/utils/ActionButtons.vue';
  import DeleteButton from '@/components/utils/DeleteButton.vue';
  import actionsNotify from '../mixins/actionsNotify';
  import navigation from '../mixins/navigation';
  import navigationSearch from '../mixins/navigationSearch';
  import { customLabels, customStyles } from '@/components/utils/pageNav.js';

  export default {
    name: 'Payment',

    components: {
      Loading, 
      Datepicker, 
      SearchBar,
      ActionButtons,
      DeleteButton
    },

    mixins: [
      actionsNotify,
      navigation, 
      navigationSearch
    ],

    data() {
      return {
        sr: sr,
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

      setPageSize(val) {
        this.pageSize = val;
        this.fetchClientsPageSize(val);
      },

      searchClients(val = '') {
        this.initClients();
        let mu = this.paymentInput.members.filter(post => {
          return post.client.first_name.toLowerCase().includes(val.toLowerCase()) || 
                  post.client.last_name.toLowerCase().includes(val.toLowerCase()) || 
                  post.client.mobile.includes(val)
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
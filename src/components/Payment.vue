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

            <div class="">
              <div class="akcije">
                <tooltip tip="Omogućava dodavanje vježbačica koje nisu u listi, kao i brisanje postojećih iz liste" />

                <button @click.prevent="toggleActions()" class="btn__auto btn__auto_toggle">{{ btn_title }}</button>

                <transition name="list" mode="out-in">
                  <form v-if="actions" @submit="handleFormSubmit" class="form__auto">
                    <autocomplete :search="searchClientsAdd"
                                  :get-result-value="getResultValue"
                                  @submit="handleSubmit"
                                  ref="autocomplete"
                                  placeholder="traži (ime) vježbačicu koja nije u listi"
                    ></autocomplete>
                    <button type="submit" class="btn__auto btn__auto_submit">
                      <svg version="1.1" id="Layer_1" x="0px" y="0px" height="20px"
                            viewBox="0 0 300.003 300.003" style="fill:var(--purple)" >
                          <path d="M150,0C67.159,0,0.001,67.159,0.001,150c0,82.838,67.157,150.003,149.997,150.003S300.002,232.838,300.002,150
                            C300.002,67.159,232.839,0,150,0z M213.281,166.501h-48.27v50.469c-0.003,8.463-6.863,15.323-15.328,15.323
                            c-8.468,0-15.328-6.86-15.328-15.328v-50.464H87.37c-8.466-0.003-15.323-6.863-15.328-15.328c0-8.463,6.863-15.326,15.328-15.328
                            l46.984,0.003V91.057c0-8.466,6.863-15.328,15.326-15.328c8.468,0,15.331,6.863,15.328,15.328l0.003,44.787l48.265,0.005
                            c8.466-0.005,15.331,6.86,15.328,15.328C228.607,159.643,221.742,166.501,213.281,166.501z"/>
                      </svg>
                    </button>
                  </form>
                </transition>
              </div>

              <div class="days__list payments__list">
                <span>Vježbačica</span>
                <span>Datum</span>
                <span>Iznos</span>
                <span>Napomena</span>
              </div>

              <div v-for="member in pageOfItems" :key="member._id" name="member"
                  class="members_input att_members pay__members">
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
              
                <svg v-if="actions" @click="removeClient(member)" 
                    class="btn_minus" version="1.1" id="Layer_1" x="0px" y="0px" height="20px"
                    viewBox="0 0 300.003 300.003" style="fill:var(--purple)" xml:space="preserve">
                      <path d="M150.001,0c-82.843,0-150,67.159-150,150c0,82.838,67.157,150.003,150,150.003c82.838,0,150-67.165,150-150.003
                        C300.001,67.159,232.838,0,150.001,0z M197.218,166.283H92.41c-8.416,0-15.238-6.821-15.238-15.238s6.821-15.238,15.238-15.238
                        H197.22c8.416,0,15.238,6.821,15.238,15.238S205.634,166.283,197.218,166.283z"/>
                </svg>
              </div>

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
  import Tooltip from '@/components/utils/Tooltip.vue';
  import actionsNotify from '../mixins/actionsNotify';
  import navigation from '../mixins/navigation';
  import navigationSearch from '../mixins/navigationSearch';
  import { customLabels, customStyles } from '@/components/utils/pageNav.js';
  import Autocomplete from '@trevoreyre/autocomplete-vue';

  export default {
    name: 'Payment',

    components: {
      Loading, 
      Datepicker, 
      SearchBar,
      ActionButtons,
      DeleteButton,
      Tooltip,
      Autocomplete
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
        actions: false,
        input: '',
        foundClient: {
          _id: '',
          note: '',
          present: true
        },
        btn_title: 'dodatne opcije'
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

      async searchClients(val = '') {
        await this.initClients();
        let mu = this.paymentInput.members.filter(post => {
          return post.client.first_name.toLowerCase().includes(val.toLowerCase()) || 
                  post.client.last_name.toLowerCase().includes(val.toLowerCase()) || 
                  post.client.mobile.includes(val)
        });
        this.filteredClients = mu;
      },

      toggleActions() {
        this.actions = !this.actions;
        this.btn_title === 'dodatne opcije' ? this.btn_title = 'sakrij' : this.btn_title = 'dodatne opcije';
      },

      searchClientsAdd(input) {
        this.input = input
        this.submitted = false
        //if (input.length < 1) { return [] }
          return this.notClients.filter(post => {
            return post.first_name.toLowerCase() 
              .startsWith(input.toLowerCase())
          })
      },

      getResultValue(result) {
        return result.last_name + ', ' + result.first_name + ' - ' + result.mobile
        //return result
      },

      handleSubmit(result) {
        this.submittedResult = result;
        this.foundClient.client = result;
        //if (this.getOneAttendance._id) this.foundClient._id = this.getOneAttendance._id;
        this.foundClient._id = this.foundClient.client._id;
      },

      handleFormSubmit(event) {
        event.preventDefault()
        if (this.foundClient._id) {
          this.paymentInput.members.unshift(this.foundClient);
          this.notClients.splice(this.notClients.findIndex(v => v._id === this.foundClient._id), 1);
          this.foundClient = {
            _id: '',
            note: '',
            present: true
          }
          this.input = '';
          this.value = ''
          this.$refs.autocomplete.value = ''
        }
      },

      removeClient(client) {
        this.paymentInput.members.splice(this.filteredClients.findIndex(v => v._id === client._id), 1);
        this.notClients.push(client.client);
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

  .pay__members {
    grid-template-columns: 1fr repeat(4, auto) !important;
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
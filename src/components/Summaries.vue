<template>
  <div class="">
    <transition name="fall" mode="out-in">

      <loading pic="loading1" v-if="loadingState" key="1" />

      <div v-else class="dash__wrapper" key="2">
        <div class="dash__items">
          <img src="../assets/img/studio881.png" alt="" class="logo responsive">
        </div>

        <div class="dash__items active__clients">
          <p class="dash__text">Aktivnih klijenata</p>
          <h1 class="active__nr">{{ activeClients.length }}</h1>
        </div>

        <div class="dash__items">
          <div class="dash__text">Plaćeno u 
            <select name="years" id="years" v-model="yearSelected" @change="selectYear(yearSelected)">
              <option :value="year" v-for="year in createYears()" :key="year">
                {{ year }}
              </option>
            </select>
            godini
          </div>
          
          <Charto v-if="loadedPayment" :chartdata="totalPayments" :chartdata2="totalExpenses"
                  :chartlabel="paymentLabels" class="charts">
          </Charto>
        </div>

        <div class="dash__items">
          <div class="dash__text">Dolasci od 
            <datepicker v-model="dateFrom" 
                        placeholder="datum upisa" 
                        class="login_input user_input datepicker"
                        :language="sr"
                        :format="customFormatter"
                        @input="selectAttendances()">
            </datepicker> 
            do 
            <datepicker v-model="dateTill" 
                        placeholder="datum upisa" 
                        class="login_input user_input datepicker"
                        :language="sr"
                        :format="customFormatter"
                        @input="selectAttendances()">
            </datepicker>
          </div>

          <Charto2 v-if="loadedAttend" :chartdata="totalAttendances" 
                    :chartlabel="attendanceLabels" class="charts">
          </Charto2>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import moment from 'moment';
  import { mapGetters, mapActions } from 'vuex';
  import Charto from './utils/AreaChart';
  import Charto2 from './utils/AreaChartLine';
  import Datepicker from 'vuejs-datepicker';
  import { sr } from 'vuejs-datepicker/dist/locale';
  import Loading from '@/components/utils/Loading.vue';

  export default {
    name: 'Summaries',

    data() {
      return {
        sr: sr,
        activeClients: [],
        totalPayments: [],
        paymentLabels: [],
        totalAttendances: [],
        attendanceLabels: [],
        totalExpenses: [],
        yearSelected: (new Date()).getFullYear(),
        dateFrom: this.getPreviousMonday(),
        dateTill: new Date().toISOString().slice(0,10),
        loadedPayment: false,
        loadedAttend: false
      }
    },

    components: { 
      Loading, 
      Charto, 
      Charto2, 
      Datepicker 
    },

    computed: {
      ...mapGetters([ 'getAllClients', 
                      'getAllPayments',
                      'getAllAttendances',
                      'getAllExpenses',
                      'loadingState' ]),
    },

    methods: {
      ...mapActions([ 'fetchClients', 
                      'fetchClient',
                      'fetchPayments',
                      'fetchAttendances',
                      'fetchExpenses',
                      'clientClear',
                      'formTypeChange',
                      'setLoadingState' ]),

      customFormatter(date) {
        return moment(date).format('DD MMM YYYY');
      },

      mapPayments() {
        return this.getAllPayments.map(d => ({
          payment_month : d.payment_month,
          payment_year : d.payment_year,
          total_amount : d.members.reduce((a, b) => a + b.payment_amount, 0)
        }));
      },

      mapAttendances() {
        return this.getAllAttendances.map(d => ({
          attend_date : d.attend_date,
          total_amount : d.members.reduce((a, b) => a + b.present, 0)
        }));
      },

      mapExpenses() {
        let helper = {};
        return this.getAllExpenses.reduce(function(r, o) {
          let key = o.expense_month + '-' + o.expense_year;
          
          if(!helper[key]) {
            helper[key] = Object.assign({}, o); // create a copy of o
            r.push(helper[key]);
          } else {
            helper[key].expense_amount += o.expense_amount;
          }
          return r;
        }, []);
      },

      currYear() {
        return (new Date()).getFullYear();
      },

      createYears() {
        return Array.from(new Array(10),( val, index) => index + 2020);
      },

      getPreviousMonday() {
        let date = new Date();
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        return new Date(firstDay).toISOString().slice(0,10);
      },

      async selectYear() {
        this.loadedPayment = false;
        await this.selectPayments();
        await this.selectExpenses();
        this.loadedPayment = true;
      },

      async selectPeriod() {
        this.loadedAttend = false;
        await this.selectAttendances();
        this.loadedAttend = true;
      },

      selectPayments() {
        let filteredPayments = this.mapPayments().filter(year => year.payment_year == this.yearSelected);
        let filteredPaymentsAmounts = filteredPayments.map(item => item.total_amount);
        let filteredPaymentsLabels = filteredPayments.map(item => item.payment_month);
        this.totalPayments = filteredPaymentsAmounts;
        this.paymentLabels = filteredPaymentsLabels;
      },

      selectAttendances() {
        let filteredAttendances = this.mapAttendances().filter(year => 
                    moment(year.attend_date).format('YYYY-MM-DD') >= moment(this.dateFrom).format('YYYY-MM-DD') && 
                    moment(year.attend_date).format('YYYY-MM-DD') <= moment(this.dateTill).format('YYYY-MM-DD'));
        let filteredAttendancesAmounts = filteredAttendances.map(item => item.total_amount);
        let filteredAttendancesLabels = filteredAttendances.map(item => moment(item.attend_date).format('DD MMM YYYY'));
        this.totalAttendances = filteredAttendancesAmounts;
        this.attendanceLabels = filteredAttendancesLabels;
      },

      selectExpenses() {
        let expenses = this.mapExpenses()
                          .filter(year => year.expense_year == this.yearSelected)
                          .map(item => item.expense_amount);
        this.totalExpenses = expenses;
      } 
    },

    watch: {
      dateFrom: function () {
        this.selectPeriod() 
      },
      dateTill: function () {
        this.selectPeriod()
      }
    },

    async mounted() {
      await this.fetchClients();
      await this.fetchPayments();
      await this.fetchAttendances();
      await this.fetchExpenses();
      this.activeClients = this.getAllClients.filter(function (e) {
        return e.active == true;
      });

      this.selectPayments();
      this.selectAttendances(this.dateTill);
      this.selectExpenses();
      
      this.setLoadingState(false);

      this.loadedPayment = true;
      this.loadedAttend = true;
    }
  }
</script>

<style>
  .dash__wrapper {
    display: grid;
    grid-template-columns: auto auto;
    justify-content: space-evenly;
    grid-gap: 1em;
    margin: 1em;
  }

  .logo {
    max-width: 350px;
  }

  .active__clients {
    align-self: center;
  }

  .active__nr {
    font-size: 3em;
    color: var(--purple-dark);
  }

  .dash__items {
    justify-self: center;
  }

  .dash__item {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .dash__text {
    color: var(--gold);
    font-variant: small-caps;
    font-size: 1.5em;
    display: flex;
    align-items: baseline;
  }

  canvas {
    justify-self: center;
  }

  .charts {
    display: grid;
  }

  .chartjs-render-monitor {
    max-height: 350px;
    max-width: 350px;
  }

  .datepicker {
    font-size: .6em !important;
    margin: 0 .5em;
    width: 110px;
  }

  .datepicker  input {
    width: 110px;
  }
</style>
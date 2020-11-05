<template>
  <div class="">
    <div v-if="loadingState" class="">
      <img src="../assets/img/loading1.gif" alt="" class="loading">
      loading ...
    </div>

    <div v-else class="dash__wrapper">
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
        
        <Charto v-if="loadedPayment" :chartdata="totalPayments" 
                :chartlabel="paymentLabels" class="charts">
        </Charto>
    <!--     <h1 v-for="tot in totalPayments" :key="tot.payment_month" class="dash__item">
          <span>{{ tot.payment_month }} {{ tot.payment_year }} : </span>
          <span>{{ tot.total_amount }}</span>
        </h1> -->
      </div>

      <div class="dash__items">
        <div class="dash__text">Dolasci od 
          <input type="date" name="" id="" v-model="dateFrom" @input="selectAttendances($event.target.value)">
          do 
          <input type="date" name="" id="" v-model="dateTill" @input="selectAttendances($event.target.value)">
        </div>

        <Charto2 v-if="loadedAttend" :chartdata="totalAttendances" 
                  :chartlabel="attendanceLabels" class="charts">
        </Charto2>
  <!--      <h1 v-for="tota in totalAttendances" :key="tota.attend_date" class="dash__item">
          <span>{{ tota.attend_date | formatDate }} : </span>
          <span>{{ tota.total_amount }}</span>
        </h1> -->
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import { mapGetters, mapActions } from 'vuex';
  import Charto from './utils/AreaChart';
  import Charto2 from './utils/AreaChartLine';

  export default {
    name: 'Summaries',

    data() {
      return {
        activeClients: [],
        totalPayments: [],
        paymentLabels: [],
        totalAttendances: [],
        attendanceLabels: [],
        yearSelected: (new Date()).getFullYear(),
        dateFrom: this.getPreviousMonday(),
        dateTill: new Date().toISOString().slice(0,10),
        loadedPayment: false,
        loadedAttend: false
      }
    },

    components: { Charto, Charto2 },

    filters: {
      formatDate: function(value) {
        if (value) {
          return moment(String(value)).format('DD/MM/YYYY')
        }
      }
    },

    computed: {
      ...mapGetters([ 'getAllClients', 
                      'getAllPayments',
                      'getAllAttendances',
                      'loadingState' ]),
    },

    methods: {
      ...mapActions([ 'fetchClients', 
                      'fetchClient',
                      'fetchPayments',
                      'fetchAttendances',
                      'clientClear',
                      'formTypeChange',
                      'setLoadingState' ]),

      mapPayments() {
        return this.getAllPayments.map(d=>({
          payment_month : d.payment_month,
          payment_year : d.payment_year,
          total_amount : d.members.reduce((a,b)=>a.payment_amount+b.payment_amount)
        }));
      },

      mapAttendances() {
        return this.getAllAttendances.map(d=>({
          attend_date : d.attend_date,
          total_amount : d.members.reduce((a,b)=>a.present+b.present)
        }));
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
        this.loadedPayment = true;
      },

      async selectPeriod() {
        this.loadedAttend = false;
        await this.selectAttendances();
        this.loadedAttend = true;
      },

      makeCorrectDate(str) {
        return new Date(str).toISOString().split('T')[0];
      },

      selectPayments() {
        let arro = this.mapPayments().filter(year => year.payment_year == this.yearSelected);
        let arr = arro.map(item => item.total_amount);
        let arr1 = arro.map(item => item.payment_month);

        this.totalPayments = arr;
        this.paymentLabels = arr1;
      },

      selectAttendances(value) {
        console.log(value)
        //this.dateTill = value;
        let arra = this.mapAttendances().filter(year => year.attend_date >= this.dateFrom && year.attend_date <= this.dateTill);
        let arra1 = arra.map(item => item.total_amount);
        let arra2 = arra.map(item => this.makeCorrectDate(item.attend_date));
        this.totalAttendances = arra1;
        this.attendanceLabels = arra2;
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
      this.activeClients = this.getAllClients.filter(function (e) {
        return e.active == true;
      });

      this.selectPayments();

      this.selectAttendances(this.dateTill);
      
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
    color: var(--purple-dark)
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
  }

  canvas {
    justify-self: center;
  }

  .charts {
    /* max-width: 750px; */
    /* max-height: 250px; */
    display: grid;
  }

  .chartjs-render-monitor {
    max-height: 350px;
    max-width: 350px;
  }
</style>
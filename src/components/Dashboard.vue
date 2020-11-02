<template>
  <div class="">
    <div v-if="loadingState" class="">
      <img src="../assets/img/loading1.gif" alt="" class="loading">
      loading ...
    </div>
    <div v-else class="dash__wrapper">
      <div class="dash__items">
        <img src="../assets/img/studio881.png" alt="" class="loading">
      </div>
      <div class="dash__items active__clients">
        <p class="dash__text">Ukupno aktivnih klijenata : </p>
        <h1 class="active__nr">{{ activeClients.length }}</h1>
      </div>
      <div class="dash__items">
        <p class="dash__text">Ukupno plaćeno : </p>
        <Charto v-if="loaded" :chartdata="totalPayments" :chartlabel="paymentLabels"
                class="charts"></Charto>
    <!--     <h1 v-for="tot in totalPayments" :key="tot.payment_month" class="dash__item">
          <span>{{ tot.payment_month }} {{ tot.payment_year }} : </span>
          <span>{{ tot.total_amount }}</span>
        </h1> -->
      </div>
      <div class="dash__items">
        <p class="dash__text">Ukupno dolasci : </p>
        <Charto2 v-if="loaded" :chartdata="totalAttendances" :chartlabel="attendanceLabels"
                  class="charts"></Charto2>
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
    name: ' Dash',

    data() {
      return {
        activeClients: [],
        totalPayments: [],
        paymentLabels: [],
        totalAttendances: [],
        attendanceLabels: [],
        loaded: false
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

      makeCorrectDate(str) {
        return new Date(str).toISOString().split('T')[0]
      },
    },

    async mounted() {
      await this.fetchClients();
      await this.fetchPayments();
      await this.fetchAttendances();
      this.activeClients = this.getAllClients.filter(function (e) {
        return e.active == true;
      });

      let arro = this.mapPayments()
      let arr = arro.map(item => item.total_amount);
      let arr1 = arro.map(item => item.payment_month);
      this.totalPayments = arr;
      this.paymentLabels = arr1;

      this.totalAttendances = this.mapAttendances();
      let arra = this.mapAttendances();
      let arra1 = arra.map(item => item.total_amount);
      let arra2 = arra.map(item => this.makeCorrectDate(item.attend_date));
      this.totalAttendances = arra1;
      this.attendanceLabels = arra2;
      
      this.setLoadingState(false);

      this.loaded = true;
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

  .charts {
    max-width: 450px;
    max-height: 250px;
  }
</style>
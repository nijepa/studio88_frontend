<template>
  <div class="schedule__card">
    <img src="../assets/img/studio881.png" alt="" class="loading">
    <div class="schedule__items">
      <p class="dash__text">Ukupno aktivnih klijenata : </p>
      <h1>{{ activeClients.length }}</h1>
    </div>
    <div class="schedule__items">
      <p class="dash__text">Ukupno plaćeno : </p>
      <h1 v-for="tot in totalPayments" :key="tot.payment_month">{{ tot.payment_month }} {{ tot.payment_year }} - {{ tot.total_amount }}</h1>
    </div>
    <div class="schedule__items">
      <p class="dash__text">Ukupno dolasci : </p>
      <h1 v-for="tota in totalAttendances" :key="tota.attend_date">{{ tota.attend_date | formatDate }} - {{ tota.total_amount }}</h1>
    </div>
  </div>
  
</template>

<script>
  import moment from 'moment';
  import { mapGetters, mapActions } from 'vuex';
  export default {
    name: ' Dash',

    data() {
      return {
        activeClients: [],
        totalPayments: [],
        totalAttendances: []
      }
    },

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
   /*        total_amount : d.members.filter(function (e) {
            return e.present == true;
          }) */
        }));
      }
    },

    async mounted() {
      await this.fetchClients();
      await this.fetchPayments();
      await this.fetchAttendances();
      this.activeClients = this.getAllClients.filter(function (e) {
        return e.active == true;
      });
      this.totalPayments = this.mapPayments();
      this.totalAttendances = this.mapAttendances();
      this.setLoadingState(false);
    }
  }
</script>

<style>
  .dash__text {
    color: var(--gold);
    font-variant: small-caps;
    font-size: 1.5em;
  }
</style>
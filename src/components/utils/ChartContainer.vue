<template>
  <div class="container">
    <line-chart
      v-if="loaded"
      :chartdata="chartdata"
      :options="options"/>
  </div>
</template>

<script>
  import LineChart from './Chart.vue'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'LineChartContainer',

    components: { LineChart },

    data: () => ({
      loaded: false,
      chartdata: null,
      options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      
    }),

    computed: {
      ...mapGetters([ 'getAllClients', 
                      'getAllPayments',
                      'getAllAttendances',
                      'loadingState' ]),
    },

    methods: {
      ...mapActions([ 'fetchClients', 
                      'fetchPayments',
                      'fetchAttendances',
                      'setLoadingState' ]),

      mapPayments() {
        return this.getAllPayments.map(d=>({
          payment_month : d.payment_month,
          payment_year : d.payment_year,
          total_amount : d.members.reduce((a,b)=>a.payment_amount+b.payment_amount)
        }));
      },
    },

    async mounted () {
      this.loaded = false
      await this.fetchPayments();
      try {
        const { userlist } = this.mapPayments()
        this.chartdata = userlist
        this.loaded = true
      } catch (e) {
        console.error(e)
      }
    }
  }
</script>

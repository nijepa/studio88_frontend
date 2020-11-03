<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  data() {
    return {
      gradient: null
    };
  },
  props: {
    chartdata: {
      type: Array,
      default: null
    },
    chartlabel: {
      type: Array,
      default: null
    }
  },
  mounted() {
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);

    this.gradient.addColorStop(0, "rgba(133, 103, 39, 0.5)");
    this.gradient.addColorStop(0.5, "rgba(133, 103, 39, 0.25)");
    this.gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

    this.renderChart(
      {
        labels: this.chartlabel
/*         [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ] */,
        datasets: [
          {
            label: "Plaćanja",
            borderColor: "#5c4885",
            pointBackgroundColor: "#5c4885",
            borderWidth: 1,
            pointBorderColor: "#5c4885",
            backgroundColor: this.gradient,
            data: this.chartdata,
            //odje bilo scales
          },
        ],
        
      },
      {
          scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  min: 0
                },
                gridLines: {
                  display: false
                }
              }],
              xAxes: [ {
                gridLines: {
                  display: false
                }
              }]
            },
        },
      { responsive: true, maintainAspectRatio: false }
    );
  }
};
</script>
<style >
  .kk {
    color: rgba(133, 103, 39, 0.5);
    color:rgba(133, 103, 39, 0.25);
    color: rgba(255, 0, 0, 0);
    color: #FC2525;
  }
</style>

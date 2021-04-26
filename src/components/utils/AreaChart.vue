<script>
import { Line } from 'vue-chartjs';
import { _adapters } from 'chart.js';
import dayjs from './dayjs';

// chartjs dayjs adapter adapted from here:
// https://gitlab.com/mmillerbkg/chartjs-adapter-dayjs/-/blob/master/src/index.js
const FORMATS = {
  datetime: 'MMM D, YYYY, h:mm:ss a',
  millisecond: 'h:mm:ss.SSS a',
  second: 'h:mm:ss a',
  minute: 'h:mm a',
  hour: 'hA',
  day: 'MMM D',
  week: 'll',
  month: 'MMM YYYY',
  quarter: '[Q]Q - YYYY',
  year: 'YYYY',
};

_adapters._date.override({
  _id: 'dayjs',
  formats: () => FORMATS,
  parse: (value, format) => {
    const valueType = typeof value;

    if (value === null || valueType === 'undefined') {
      return null;
    }

    let parsedValue = null;

    if (valueType === 'string' && typeof format === 'string') {
      parsedValue = dayjs(value, format);
    } else if (!(value instanceof dayjs)) {
      parsedValue = dayjs(value);
    }

    return parsedValue.isValid() ? parsedValue.valueOf() : null;
  },
  format: (time, format) => dayjs(time).format(format),
  add: (time, amount, unit) => dayjs(time).add(amount, unit).valueOf(),
  diff: (max, min, unit) => dayjs(max).diff(dayjs(min), unit),
  startOf: (time, unit, weekday) => {
    if (unit === 'isoWeek') {
      return dayjs(time).isoWeekday(weekday).startOf('day').valueOf();
    }

    return dayjs(time).startOf(unit).valueOf();
  },
  endOf: (time, unit) => dayjs(time).endOf(unit).valueOf(),
});

export default {
  extends: Line,

  data() {
    return {
      gradient: null,
    };
  },

  props: {
    chartdata: {
      type: Array,
      default: null,
    },
    chartdata2: {
      type: Array,
      default: null,
    },
    chartlabel: {
      type: Array,
      default: null,
    },
  },

  mounted() {
    this.gradient = this.$refs.canvas
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 450);

    this.gradient.addColorStop(0, 'rgba(133, 103, 39, 0.75)');
    this.gradient.addColorStop(0.5, 'rgba(133, 103, 39, 0.25)');
    this.gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

    this.gradient2 = this.$refs.canvas
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 450);

    this.gradient2.addColorStop(0, 'rgba(92, 72, 133, 0.75)');
    this.gradient2.addColorStop(0.5, 'rgba(92, 72, 133, 0.25)');
    this.gradient2.addColorStop(1, 'rgba(255, 0, 0, 0)');

    this.renderChart(
      {
        labels: this.chartlabel,
        /*         [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July"
          ] */ datasets: [
          {
            label: 'Plaćanja',
            borderColor: '#856727',
            pointBackgroundColor: ' #856727',
            borderWidth: 1,
            pointBorderColor: '#856727',
            backgroundColor: this.gradient,
            data: this.chartdata,
            //odje bilo scales
          },
          {
            label: 'Troškovi',
            borderColor: '#5c4885',
            pointBackgroundColor: '#5c4885',
            borderWidth: 1,
            pointBorderColor: '#5c4885',
            backgroundColor: this.gradient2,
            data: this.chartdata2,
            //odje bilo scales
          },
        ],
      },
      {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                min: 0,
              },
              gridLines: {
                display: false,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
          maintainAspectRatio: false,
          responsive: true,
          height: 300,
        },
      }
      //{ responsive: true, maintainAspectRatio: false }
    );
  },
};
</script>

<style>
.kk {
  color: rgb(92, 72, 133);
  color: rgba(133, 103, 39, 0.25);
  color: rgba(255, 0, 0, 0);
  color: rgb(92, 72, 133);
}
</style>

<template>
  <div class="">
    <!-- <transition name="slide" mode="out-in"> -->
    <loading pic="loading1" v-if="loadingState" key="1" />

    <div v-else class="dash__wrapper" key="2">
      <div class="dash__items">
        <img
          src="../assets/img/studio881.png"
          alt="studio 88"
          class="logo responsive"
          rel="preload"
        />
      </div>

      <loading pic="loading1" v-if="!activeClients.length" key="7" />
      <div v-else class="dash__items active__clients" key="3">
        <p class="dash__text">Aktivnih klijenata</p>
        <h1 class="active__nr">{{ activeClients.length }}</h1>
      </div>

      <loading pic="loading1" v-if="!loadedPayment" key="8" />
      <div class="dash__items" v-else key="4">
        <div class="dash__text">
          Plaćeno u
          <select
            name="years"
            id="years"
            v-model="yearSelected"
            @change="selectYear(yearSelected)"
            class="no_border"
          >
            <option :value="year" v-for="year in createYears()" :key="year">
              {{ year }}
            </option>
          </select>
          godini
        </div>

        <ChartPayments
          v-if="loadedPayment"
          :chartdata="totalPayments"
          :chartdata2="totalExpenses"
          :chartlabel="paymentLabels"
          class="charts"
        >
        </ChartPayments>
      </div>

      <loading pic="loading1" v-if="!loadedAttend" key="6" />
      <div class="dash__items" v-else key="5">
        <div class="dash__text">
          Dolasci od
          <datepicker
            v-model="dateFrom"
            placeholder="datum upisa"
            class="datepicker noborder"
            :language="sr"
            :format="customFormatter"
            @input="selectAttendances()"
          >
          </datepicker>
          do
          <datepicker
            v-model="dateTill"
            placeholder="datum upisa"
            class="datepicker noborder"
            :language="sr"
            :format="customFormatter"
            @input="selectAttendances()"
          >
          </datepicker>
        </div>

        <ChartAttendances
          v-if="loadedAttend"
          :chartdata="totalAttendances"
          :chartlabel="attendanceLabels"
          class="charts"
        >
        </ChartAttendances>
      </div>
    </div>
    <!-- </transition> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ChartPayments from '@/components/utils/AreaChart';
import ChartAttendances from '@/components/utils/AreaChartLine';
import Loading from '@/components/utils/Loading.vue';
import Datepicker from 'vuejs-datepicker';
import { sr } from 'vuejs-datepicker/dist/locale';
import dayjs from 'dayjs';
import srb from 'dayjs/locale/sr';

dayjs.locale(srb);

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
      yearSelected: new Date().getFullYear(),
      dateFrom: this.getPreviousMonday(),
      dateTill: new Date().toISOString().slice(0, 10),
      loadedPayment: false,
      loadedAttend: false,
    };
  },

  components: {
    Loading,
    ChartPayments,
    ChartAttendances,
    Datepicker,
  },

  computed: {
    ...mapGetters([
      'getAllClients',
      'getAllPayments',
      'getAllAttendances',
      'getAllExpenses',
      'loadingState',
    ]),
  },

  methods: {
    ...mapActions([
      'fetchClients',
      'fetchClient',
      'fetchPayments',
      'fetchAttendances',
      'fetchExpenses',
      'clientClear',
      'setLoadingState',
    ]),

    customFormatter(date) {
      return dayjs(date).format('DD MMM YYYY');
    },

    mapPayments() {
      return this.getAllPayments.map((d) => ({
        payment_month: d.payment_month,
        payment_year: d.payment_year,
        total_amount: d.members.reduce((a, b) => a + b.payment_amount, 0),
      }));
    },

    mapAttendances() {
      return this.getAllAttendances.map((d) => ({
        attend_date: d.attend_date,
        total_amount: d.members.reduce((a, b) => a + b.present, 0),
      }));
    },

    mapExpenses() {
      let helper = {};
      return this.getAllExpenses.reduce(function (r, o) {
        let key = o.expense_month + '-' + o.expense_year;

        if (!helper[key]) {
          helper[key] = Object.assign({}, o); // create a copy of o
          r.push(helper[key]);
        } else {
          helper[key].expense_amount += o.expense_amount;
        }
        return r;
      }, []);
    },

    currYear() {
      return new Date().getFullYear();
    },

    createYears() {
      return Array.from(new Array(10), (val, index) => index + 2020);
    },

    getPreviousMonday() {
      let date = new Date();
      return new Date(date.getFullYear(), date.getMonth(), 2)
        .toISOString()
        .slice(0, 10);
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
      let filteredPayments = this.mapPayments().filter(
        (year) => year.payment_year == this.yearSelected
      );
      let filteredPaymentsAmounts = filteredPayments
        .map((item) => item.total_amount)
        .sort((a, b) => (a.payment_date > b.payment_date ? -1 : 1));
      let filteredPaymentsLabels = filteredPayments
        .map((item) => item.payment_month)
        .sort((a, b) => (a.payment_date > b.payment_date ? -1 : 1));
      this.totalPayments = filteredPaymentsAmounts;
      this.paymentLabels = filteredPaymentsLabels;
    },

    selectAttendances() {
      let filteredAttendances = this.mapAttendances().filter(
        (year) =>
          dayjs(year.attend_date).format('YYYY-MM-DD') >=
            dayjs(this.dateFrom).format('YYYY-MM-DD') &&
          dayjs(year.attend_date).format('YYYY-MM-DD') <=
            dayjs(this.dateTill).format('YYYY-MM-DD')
      );
      let filteredAttendancesAmounts = filteredAttendances
        .map((item) => item.total_amount)
        .sort((a, b) => (a.attend_date > b.attend_date ? -1 : 1));
      let filteredAttendancesLabels = filteredAttendances
        .map((item) => dayjs(item.attend_date).format('DD MMM YYYY'))
        .sort((a, b) => (a.attend_date > b.attend_date ? -1 : 1));
      this.totalAttendances = filteredAttendancesAmounts;
      this.attendanceLabels = filteredAttendancesLabels;
    },

    selectExpenses() {
      let expenses = this.mapExpenses()
        .filter((year) => year.expense_year == this.yearSelected)
        .map((item) => item.expense_amount)
        .sort((a, b) => (a.expense_date > b.expense_date ? -1 : 1));
      this.totalExpenses = expenses;
    },
  },

  watch: {
    dateFrom: function () {
      this.selectPeriod();
    },
    dateTill: function () {
      this.selectPeriod();
    },
  },

  async mounted() {
    if (!this.getAllClients.length) await this.fetchClients();
    if (!this.getAllPayments.length) await this.fetchPayments();
    if (!this.getAllAttendances.length) await this.fetchAttendances();
    if (!this.getAllExpenses.length) await this.fetchExpenses();
    this.setLoadingState(false);
    this.activeClients = this.getAllClients.filter(function (e) {
      return e.active == true;
    });

    this.selectPayments();
    this.selectAttendances(this.dateTill);
    this.selectExpenses();

    this.loadedPayment = true;
    this.loadedAttend = true;
  },
};
</script>

<style>
.no_border {
  transition: ease 0.5s all;
  border-radius: 0.5em;
}
.no_border:hover {
  background: var(--gold);
  color: var(--purple-lightest);
}
.no_border:focus {
  background: transparent;
  color: var(--black);
}
@media (max-width: 599px) {
  .datepicker {
    width: 110px;
  }
}
</style>

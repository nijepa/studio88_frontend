<template>
  <div class="dash__text search_group" :class="isGrid ? 'is__grid' : ''">
    Period od
    <datepicker
      v-model="dateFrom"
      class="datepicker noborder"
      :language="sr"
      :format="customFormatter"
      @input="selectPeriod()"
    >
    </datepicker>
    do
    <datepicker
      v-model="dateTill"
      class="datepicker noborder"
      :language="sr"
      :format="customFormatter"
      @input="selectPeriod()"
    >
    </datepicker>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Datepicker from "vuejs-datepicker";
import { sr } from "vuejs-datepicker/dist/locale";
import dayjs from "dayjs";
//import srb from "dayjs/locale/sr";

export default {
  name: "Period",

  components: {
    Datepicker,
  },

  props: {
    isGrid: { type: Boolean, default: false },
  },

  data() {
    return {
      sr: sr,
      yearSelected: new Date().getFullYear(),
      dateFrom: this.getPreviousMonday(),
      dateTill: new Date().toISOString().slice(0, 10),
    };
  },

  computed: {
    ...mapGetters(["getPeriod"]),
  },

  methods: {
    ...mapActions(["fetchPeriod"]),

    customFormatter(date) {
      return dayjs(date).format("DD MMM YYYY");
    },

    getPreviousMonday() {
      let date = new Date();
      let firstDay = new Date(date.getFullYear(), 0, 2);
      return new Date(firstDay).toISOString().slice(0, 10);
    },

    async selectPeriod() {
      const period = {
        dateFrom: this.dateFrom,
        dateTill: this.dateTill,
      };
      await this.fetchPeriod(period);
      this.$emit("filter-period", this.dateFrom, this.dateTill);
    },

    isEmpty(obj) {
      for (var i in obj) return false;
      return true;
    },
  },

  mounted() {
    if (!this.isEmpty(this.getPeriod)) {
      this.dateFrom = this.getPeriod.dateFrom;
      this.dateTill = this.getPeriod.dateTill;
    }
    this.$emit("dates", this.dateFrom, this.dateTill);
  },
};
</script>

<style>
.is__grid {
  display: grid;
  font-size: 1.2em;
  width: auto !important;
}
</style>

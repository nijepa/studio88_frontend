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
import Datepicker from "vuejs-datepicker";
import { sr } from "vuejs-datepicker/dist/locale";
import dayjs from "dayjs";
//import srb from "dayjs/locale/sr";

export default {
  name: 'Period',

  components: {
    Datepicker
  },

  props: {
    isGrid: { type: Boolean, default: false },
  },

  data() {
    return {
      sr: sr,
      yearSelected: new Date().getFullYear(),
      dateFrom: this.getPreviousMonday(),
      dateTill: new Date().toISOString().slice(0, 10)
    };
  },

  methods: {
    customFormatter(date) {
      return dayjs(date).format("DD MMM YYYY");
    },

    getPreviousMonday() {
      let date = new Date();
      let firstDay = new Date(date.getFullYear(), 0, 2);
      return new Date(firstDay).toISOString().slice(0, 10);
    },

    selectPeriod() {
      this.$emit('filter-period', this.dateFrom, this.dateTill);
    }
  },

  mounted() {
    this.$emit('dates', this.dateFrom, this.dateTill)
  },
};
</script>

<style>
  .is__grid  {
    display: grid;
    font-size: 1.2em
  }
</style>

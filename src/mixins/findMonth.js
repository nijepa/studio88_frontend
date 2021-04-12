export default {
  /*   data() {
      return {
        payment_month: this.checkMonth(),
      }
    }, */

  methods: {
    checkMonth() {
      let d = new Date();
      let month = new Array();
      month[0] = "Januar";
      month[1] = "Februar";
      month[2] = "Mart";
      month[3] = "April";
      month[4] = "Maj";
      month[5] = "Jun";
      month[6] = "Jul";
      month[7] = "Avgust";
      month[8] = "Septembar";
      month[9] = "Oktobar";
      month[10] = "Novembar";
      month[11] = "Decembar";
      var n = month[d.getMonth()];
      return n;
    },
  },
};

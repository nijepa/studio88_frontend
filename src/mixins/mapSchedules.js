export default {
  methods: {
    mapSchedules() {
      let obj,
        arr = [];
      for (let i = 0; i < this.getAllSchedules.length; i++) {
        for (let j = 0; j < this.getAllSchedules[i].members.length; j++) {
          obj = {
            title: this.getAllSchedules[i].title,
            startTime: this.getAllSchedules[i].startTime,
            client: this.getAllSchedules[i].members[j].client,
          };
          arr.push(obj);
        }
      }
      return arr;
    },

    setClientSchedule(id) {
      let sche = '';
      sche = this.mapSchedules().filter((post) => {
        return post.client._id == id;
      });
      return sche[0] ? sche[0].title + '/' + sche[0].startTime : 'Nema grupu';
    },
  },
};

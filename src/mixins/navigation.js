export default
{
  data() {
    return {
      pageOfItems: [],
  
    }
  },

  methods: {
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
  },
}
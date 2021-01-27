export default
{
  data() {
    return {
      filteredClients: [],
      initialPage: 1,
      pageSize: 10,
      search: '',
      appeared: false,
    }
  },

  methods: {
    onAppeared() {
      this.appeared = true;
    },
  },
}
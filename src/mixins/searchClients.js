export default {
  watch: {
    pageSize() {
      this.searchClients();
    },
  },
  methods: {
    setPageSize(val) {
      this.pageSize = val;
      this.fetchClientsPageSize(val);
    },

    setPageNr() {
      const element = document.querySelector("ul.pagination > li.active");
      if (element) this.fetchClientsPage(Number(element.innerText));
    },
  },
};

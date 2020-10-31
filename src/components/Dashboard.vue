<template>
  <div class="">
    <img src="../assets/img/studio881.png" alt="" class="loading">
    <p>Ukupno aktivnih klijenata : {{ activeClients.length }}</p>

  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    name: ' Dash',

    data() {
      return {
        activeClients: []
      }
    },

    computed: {
      ...mapGetters([ 'getAllClients', 
                      'loadingState' ]),
    },

    methods: {
      ...mapActions([ 'fetchClients', 
                      'fetchClient',
                      'clientClear',
                      'formTypeChange',
                      'setLoadingState' ]),
    },

    async mounted() {
      await this.fetchClients();
      this.activeClients = this.getAllClients.filter(function (e) {
        return e.active == true;
      })
      this.setLoadingState(false);
    }
  }
</script>

<style>

</style>
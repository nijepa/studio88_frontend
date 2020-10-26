<template>
  <div class="">
    <navigation></navigation>
    <transition name="slide-fade" mode="out-in">
    <clients v-if="getFormType === 'clients'" ></clients>
    <client v-if="getFormType === 'client'"></client>
    </transition>
    <schedule v-if="getFormType === 'schedule'"></schedule>
    <schedules v-if="getFormType === 'schedules'"></schedules>
  </div>
</template>

<script>
  import Navigation from "@/components/Navigation.vue";
  import Client from "@/components/Client.vue";
  import Clients from "@/components/Clients.vue";
  import Schedule from "@/components/Schedule.vue";
  import Schedules from "@/components/Schedules.vue";
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'Dashboard',

    components: {
      Navigation, Client, Schedule, Clients, Schedules
    },

    data() {
      return {
        showForm: false
      }
    },

    computed: {
      ...mapGetters([ 'getFormType' ]),
    },

    methods: {
      ...mapActions([ 'formTypeChange' ]),

/*       handleForm(value) {
        console.log(value)
        this.showForm = value;
      } */
    }
  }
</script>

<style>

</style>
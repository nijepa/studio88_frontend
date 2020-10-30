<template>
  <div class="">
    <navigation></navigation>
    <transition name="slide-fade" mode="out-in">
    <clients v-if="getFormType === 'clients'" key="clients"></clients>
    </transition>
    <client v-if="getFormType === 'client'" key='client'></client>
    <schedule v-if="getFormType === 'schedule'" key="schedule"></schedule>
    <schedules v-if="getFormType === 'schedules'" key="schedules"></schedules>
    <payments v-if="getFormType === 'payments'" key="payments"></payments>
    <payment v-if="getFormType === 'payment'" key="payment"></payment>
    <attendances v-if="getFormType === 'attendances'" key="attendances"></attendances>
    <attendance v-if="getFormType === 'attendance'" key="attendance"></attendance>
    
    <Footer></Footer>
  </div>
</template>

<script>
  import Navigation from "@/components/Navigation.vue";
  import Footer from "@/components/Footer.vue";
  import Client from "@/components/Client.vue";
  import Clients from "@/components/Clients.vue";
  import Schedule from "@/components/Schedule.vue";
  import Schedules from "@/components/Schedules.vue";
  import Payments from "@/components/Payments.vue";
  import Payment from "@/components/Payment.vue";
  import Attendances from "@/components/Attendances.vue";
  import Attendance from "@/components/Attendance.vue";
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'Dashboard',

    components: {
      Navigation, 
      Footer,
      Client, 
      Schedule, 
      Clients, 
      Schedules, 
      Payments, 
      Payment,
      Attendances,
      Attendance
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
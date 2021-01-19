<template>
  <div class="">
    <navigation></navigation>
    <summaries v-if="getFormType === 'home'" key="home"></summaries>
    <Signup v-if="getFormType === 'signup'" key="signup"></Signup>
    
    <transition name="slide-fade" mode="out-in">
    <clients v-if="getFormType === 'clients'" key="clients"></clients>
    </transition>
    <client v-if="getFormType === 'client'" key='client'></client>
    <client-activity v-if="getFormType === 'clientactivity'" key='clientactivity'></client-activity>
    <schedule v-if="getFormType === 'schedule'" key="schedule"></schedule>
    <schedules v-if="getFormType === 'schedules'" key="schedules"></schedules>
    <payments v-if="getFormType === 'payments'" key="payments"></payments>
    <payment v-if="getFormType === 'payment'" key="payment"></payment>
    <attendances v-if="getFormType === 'attendances'" key="attendances"></attendances>
    <attendance v-if="getFormType === 'attendance'" key="attendance"></attendance>
    <expenses v-if="getFormType === 'expenses'" key="expenses"></expenses>
    <expense v-if="getFormType === 'expense'" key="expense"></expense>
    <general v-if="getFormType === 'general'" key="general"></general>
    
    <Footer></Footer>

    <to-top-button />
  </div>
</template>

<script>
  import Navigation from "@/components/Navigation.vue";
  import Footer from "@/components/Footer.vue";
  import Signup from "@/components/SignUp.vue";
  import Summaries from "@/components/Summaries.vue";
  import Client from "@/components/Client.vue";
  import ClientActivity from "@/components/ClientActivity.vue";
  import Clients from "@/components/Clients.vue";
  import Schedule from "@/components/Schedule.vue";
  import Schedules from "@/components/Schedules.vue";
  import Payments from "@/components/Payments.vue";
  import Payment from "@/components/Payment.vue";
  import Attendances from "@/components/Attendances.vue";
  import Attendance from "@/components/Attendance.vue";
  import Expenses from "@/components/Expenses.vue";
  import Expense from "@/components/Expense.vue";
  import General from "@/components/General.vue";
  import ToTopButton from "@/components/utils/ToTopButton.vue";
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'Dashboard',

    components: {
      Navigation, 
      Footer,
      Signup,
      Summaries,
      Client, 
      Schedule, 
      Clients, 
      Schedules, 
      Payments, 
      Payment,
      Attendances,
      Attendance,
      Expenses,
      Expense,
      ClientActivity,
      General,
      ToTopButton
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
      ...mapActions([ 'initialState',
                      'formTypeChange' ]),

/*       handleForm(value) {
        console.log(value)
        this.showForm = value;
      } */
    },

/*     created() {
      this.initialState();
    } */
  }
</script>

<style>

</style>
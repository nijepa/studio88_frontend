<template>
  <div class="">
    <navigation @toggled-form="handleForm"></navigation>
    <user v-if="showForm === 1"></user>
    <schedule v-if="showForm === 2"></schedule>
  </div>
</template>

<script>
  import Navigation from "@/components/Navigation.vue";
  import User from "@/components/User.vue";
  import Schedule from "@/components/Schedule.vue";

  export default {
    name: 'Dashboard',
    components: {
      Navigation, User, Schedule
    },
    data() {
      return {
        showForm: false
      }
    },
    methods: {
      handleForm(value) {
        console.log(value)
        this.showForm = value;
      }
    }
  }
</script>

<style>

</style>
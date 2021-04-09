<template>
  <div class="">
    <!-- <transition name="slide" mode="out-in"> -->
      <Navigation />
    <!-- </transition> -->
    
    <transition name="slide" mode="out-in">
      <router-view />
    </transition>
    
    <Footer></Footer>

    <to-top-button />
  </div>
</template>

<script>
  import Navigation from "@/components/Navigation.vue";
  import Footer from "@/components/Footer.vue";
  import ToTopButton from "@/components/utils/ToTopButton.vue";
  import { mapActions } from 'vuex';

  export default {
    name: 'Dashboard',

    components: {
      Navigation, 
      Footer,
      ToTopButton
    },

    methods: {
      ...mapActions([ 'initialState' ]),
    },

    created() {
      this.initialState();
    } 
  }
</script>

<style>
  .slide-enter-active {
    transition: all .5s ease-in-out;
    /* position: absolute; */
  }

  .slide-leave-active {
    transition: all .5s ease-in-out;
    /* position: absolute; */
  }

  .slide-enter {
    transform: translateX(-2em);
    opacity: 0;
  }

  .slide-leave-to {
    transform: translateX(2em);
    opacity: 0;
  }

  .slide-move {
    transition: all .5s ease;
  }
</style>
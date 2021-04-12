<template>
  <div class="">
    <a class="skip-link" href="#maincontent">Skip to main</a>
    <div class="" id="maincontent">
      <!-- <transition name="slide" mode="out-in"> -->
      <Navigation />
      <!-- </transition> -->

      <transition name="slide" mode="out-in">
        <router-view />
      </transition>

      <Footer></Footer>

      <to-top-button />
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import Footer from "@/components/Footer.vue";
import ToTopButton from "@/components/utils/ToTopButton.vue";
import { mapActions } from "vuex";

export default {
  name: "Dashboard",

  components: {
    Navigation,
    Footer,
    ToTopButton,
  },

  methods: {
    ...mapActions(["initialState"]),
  },

  created() {
    this.initialState();
  },
};
</script>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000000;
  color: white;
  padding: 8px;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}

.slide-enter-active {
  transition: all 0.4s ease-in-out;
}

.slide-leave-active {
  transition: all 0.4s ease-in-out;
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
  transition: all 0.5s ease;
}
</style>
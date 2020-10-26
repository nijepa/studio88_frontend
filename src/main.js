import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueIziToast from "vue-izitoast";

import "izitoast/dist/css/iziToast.css";

Vue.use(VueIziToast);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

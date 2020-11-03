import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueIziToast from "vue-izitoast";

import "izitoast/dist/css/iziToast.css";

Vue.use(VueIziToast);

// register jw pagination component globally
import JwPagination from 'jw-vue-pagination';
Vue.component('jw-pagination', JwPagination);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

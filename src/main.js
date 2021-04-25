import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// register VueIziToast component globally
import VueIziToast from 'vue-izitoast';
import 'izitoast/dist/css/iziToast.css';
Vue.use(VueIziToast);

// register jw pagination component globally
import JwPagination from 'jw-vue-pagination';
Vue.component('jw-pagination', JwPagination);

Vue.config.productionTip = false;

import dayjs from 'dayjs';
import srb from 'dayjs/locale/sr';

dayjs.locale(srb);

// global filters
Vue.filter('formatDay', function (value) {
  if (!value) return '';
  if (value) {
    return dayjs(value).format('dddd');
  }
});
Vue.filter('formatDate', function (value) {
  if (!value) return '';
  if (value) {
    return dayjs(String(value)).format('DD MMM YYYY');
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

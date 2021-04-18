import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import clientModule from "./client";
import scheduleModule from "./schedule";
import paymentModule from "./payment";
import userModule from "./user";
import attendanceModule from "./attendance";
import expenseModule from "./expense";
import generalModule from "./general";
//import utilsModule from './utils';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  modules: {
    clientModule,
    scheduleModule,
    paymentModule,
    attendanceModule,
    expenseModule,
    userModule,
    generalModule,
    //utilsModule
  },
});

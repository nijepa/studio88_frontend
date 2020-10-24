import Vue from "vue";
import Vuex from "vuex";
import clientModule from './client';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    clientModule
  }
});

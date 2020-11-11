import axios from 'axios';
const URL = process.env.VUE_APP_BACKEND_URL_LOCAL;
// import apiClient from './api_client';
//import router from '../router';


const  state = {
  general: {},
  //expenses: []
};

/* -------------------------------------- GETTERS -------------------------------------- */
const getters = {
  //getAllExpenses: state => state.expenses,
  getGeneral: state => state.general
};

/* -------------------------------------- MUTATIONS -------------------------------------- */
const  mutations = {
  //setExpenses: (state, expenses) => (state.expenses = expenses),

  setGeneral: (state, general) => (state.general = general[0]),

/*   clearExpense(state) {
    state.expense = {};
  }, */

  addGeneral(state, text) {
    state.general = text;
  }, 

  updateGeneral(state, general) {
    state.general =  {...general}
    
/*     state.general = [
      ...state.general.map(item => 
          item._id !== expense._id ? item : {...item, ...expense}
      )
    ]  */
  },

  addPrice (state, price) {
    const objIndex = state.general.map(function(x) {return x._id; }).indexOf(price._id);
    Object.assign(state.general[objIndex], { prices: price.prices });
  },

/*   deleteGeneral (state, id) {
    state.expenses = [
      ...state.expenses.filter((item) => item._id !== id)
    ];
  }, */
};

/* -------------------------------------- ACTIONS -------------------------------------- */
const actions = {
  async fetchGenerals ({ commit }) {
    const response = await axios.get(URL + "generals");
    commit('setGeneral', response.data);
  },

  async fetchGeneral ({ commit }, generalData) {
    const response = await axios.get(URL + "generals/" + generalData._id, generalData);
    commit('setGeneral', response.data);
  },

  async generalAdd({commit}, generalData) {
    await axios.post(URL + 'generals', generalData)
      .then((response) => {
        commit('addGeneral', response.data.general);
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      })
  },

  async generalUpdate({commit}, generalData) {
    await axios.put(URL + 'generals/' + generalData._id, generalData)
      .then((response) => {
        commit('updateGeneral', response.data);
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      })
  },

  async createPrice({ commit }, priceData) {
    await axios.post(URL + 'generals/price', priceData)
      .then((response) => {
        commit('addPrice', response.data);
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      })
  },

/*   async expenseDelete({commit}, expenseData) {
    await axios.delete(URL + 'expenses/' + expenseData._id, expenseData)
      .then((response) => {
        commit('deleteExpense', response.data._id)
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      })
  }, */

/*   async expenseClear({commit}) {
    commit('clearExpense');
  } */
};

export default {
  state,
  getters,
  actions,
  mutations
};
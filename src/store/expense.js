import axios from 'axios';
const URL = process.env.VUE_APP_BACKEND_URL;
// import apiClient from './api_client';
//import router from '../router';


const state = {
  expense: {},
  expenses: []
};

/* -------------------------------------- GETTERS -------------------------------------- */
const getters = {
  getAllExpenses: state => state.expenses,
  getOneExpense: state => state.expense
};

/* -------------------------------------- MUTATIONS -------------------------------------- */
const mutations = {
  setExpenses: (state, expenses) => (state.expenses = expenses),

  setExpense: (state, expense) => (state.expense = expense),

  clearExpense(state) {
    state.expense = {};
  },

  addExpense(state, text) {
    state.expenses = [text, ...state.expenses]
  },

  updateExpense(state, expense) {
    state.expenses = [
      ...state.expenses.map(item =>
        item._id !== expense._id ? item : {
          ...item,
          ...expense
        }
      )
    ]
  },

  deleteExpense(state, id) {
    state.expenses = [
      ...state.expenses.filter((item) => item._id !== id)
    ];
  },
};

/* -------------------------------------- ACTIONS -------------------------------------- */
const actions = {
  async fetchExpenses({
    commit
  }) {
    const response = await axios.get(URL + "expenses");
    commit('setExpenses', response.data);
  },

  async fetchExpense({
    commit
  }, expenseData) {
    const response = await axios.get(URL + "expenses/" + expenseData._id, expenseData);
    commit('setExpense', response.data);
  },

  async expenseAdd({
    commit
  }, expenseData) {
    await axios.post(URL + 'expenses', expenseData)
      .then((response) => {
        commit('addExpense', response.data.expense);
        //router.push("/dashboard")
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      })
  },

  async expenseUpdate({
    commit
  }, expenseData) {
    await axios.put(URL + 'expenses/' + expenseData._id, expenseData)
      .then((response) => {
        commit('updateExpense', response.data);
        //router.push("/dashboard");
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      })
  },

  async expenseDelete({
    commit
  }, expenseData) {
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
  },

  async expenseClear({
    commit
  }) {
    commit('clearExpense');
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
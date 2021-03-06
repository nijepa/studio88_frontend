import axios from 'axios';
const URL = process.env.VUE_APP_BACKEND_URL;
// import apiClient from './api_client';

const state = {
  payment: {},
  payments: [],
  period: {},
};

/* -------------------------------------- GETTERS -------------------------------------- */
const getters = {
  getAllPayments: (state) => state.payments,
  getOnePayment: (state) => state.payment,
  getPeriod: (state) => state.period,
};

/* -------------------------------------- MUTATIONS -------------------------------------- */
const mutations = {
  setPayments: (state, payments) => (state.payments = payments),

  setPayment: (state, payment) => (state.payment = payment),

  setPeriod: (state, period) => (state.period = period),

  clearPayment(state) {
    state.payment = {};
  },

  addPayment(state, text) {
    state.payments = [text, ...state.payments];
  },

  updatePayment(state, payment) {
    state.payments = [
      ...state.payments.map((item) =>
        item._id !== payment._id
          ? item
          : {
              ...item,
              ...payment,
            }
      ),
    ];
  },

  deletePayment(state, id) {
    state.payments = [...state.payments.filter((item) => item._id !== id)];
  },
};

/* -------------------------------------- ACTIONS -------------------------------------- */
const actions = {
  async fetchPayments({ commit }) {
    const response = await axios.get(URL + 'payments');
    commit('setPayments', response.data);
  },

  async fetchPayment({ commit }, paymentData) {
    const response = await axios.get(
      URL + 'payments/' + paymentData._id,
      paymentData
    );
    commit('setPayment', response.data);
  },

  async fetchPeriod({ commit }, periodData) {
    commit('setPeriod', periodData);
  },

  async paymentAdd({ commit }, paymentData) {
    await axios
      .post(URL + 'payments', paymentData)
      .then((response) => {
        commit('addPayment', response.data.payment);
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      });
  },

  async paymentUpdate({ commit }, paymentData) {
    await axios
      .put(URL + 'payments/' + paymentData._id, paymentData)
      .then((response) => {
        commit('updatePayment', response.data);
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      });
  },

  async paymentDelete({ commit }, paymentData) {
    await axios
      .delete(URL + 'payments/' + paymentData._id, paymentData)
      .then((response) => {
        commit('deletePayment', response.data._id);
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      });
  },

  async paymentClear({ commit }) {
    commit('clearPayment');
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

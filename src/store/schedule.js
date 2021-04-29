import axios from 'axios';
const URL = process.env.VUE_APP_BACKEND_URL;
// import apiClient from './api_client';

const state = {
  schedule: {},
  schedules: [],
  notClients: [],
};

/* -------------------------------------- GETTERS -------------------------------------- */
const getters = {
  getAllSchedules: (state) => state.schedules,
  getOneSchedule: (state) => state.schedule,
  getNotClients: (state) => state.notClients,
};

/* -------------------------------------- MUTATIONS -------------------------------------- */
const mutations = {
  setSchedules: (state, schedules) => (state.schedules = schedules),

  setSchedule: (state, schedule) => (state.schedule = schedule),

  setNotClients: (state, notClients) => (state.notClients = notClients),

  clearSchedule(state) {
    state.schedule = {};
  },

  addSchedule(state, text) {
    state.schedules = [text, ...state.schedules];
  },

  updateSchedule(state, schedule) {
    state.schedules = [
      ...state.schedules.map((item) =>
        item._id !== schedule._id
          ? item
          : {
              ...item,
              ...schedule,
            }
      ),
    ];
  },

  deleteSchedule(state, id) {
    state.schedules = [...state.schedules.filter((item) => item._id !== id)];
  },
};

/* -------------------------------------- ACTIONS -------------------------------------- */
const actions = {
  async fetchSchedules({ commit }) {
    const response = await axios.get(URL + 'schedules');
    commit('setSchedules', response.data);
  },

  async fetchSchedule({ commit }, scheduleData) {
    const response = await axios.get(
      URL + 'schedules/' + scheduleData._id,
      scheduleData
    );
    commit('setSchedule', response.data);
  },

  async fetchNotClients({ commit }, scheduleData) {
    const response = await axios.get(
      URL + 'schedules/clientsnot/' + scheduleData._id,
      scheduleData
    );
    commit('setNotClients', response.data);
  },

  async scheduleAdd({ commit }, scheduleData) {
    await axios
      .post(URL + 'schedules', scheduleData)
      .then((response) => {
        commit('addSchedule', response.data.schedule);
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      });
  },

  async scheduleUpdate({ commit }, scheduleData) {
    await axios
      .put(URL + 'schedules/' + scheduleData._id, scheduleData)
      .then((response) => {
        commit('updateSchedule', response.data);
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      });
  },

  async scheduleDelete({ commit }, scheduleData) {
    await axios
      .delete(URL + 'schedules/' + scheduleData._id, scheduleData)
      .then((response) => {
        commit('deleteSchedule', response.data._id);
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      });
  },

  async scheduleClear({ commit }) {
    commit('clearSchedule');
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

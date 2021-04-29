import axios from 'axios';
const URL = process.env.VUE_APP_BACKEND_URL;
// import apiClient from './api_client';

const state = {
  attendance: {},
  attendances: [],
};

/* -------------------------------------- GETTERS -------------------------------------- */
const getters = {
  getAllAttendances: (state) => state.attendances,
  getOneAttendance: (state) => state.attendance,
};

/* -------------------------------------- MUTATIONS -------------------------------------- */
const mutations = {
  setAttendances: (state, attendances) => (state.attendances = attendances),

  setAttendance: (state, attendance) => (state.attendance = attendance),

  clearAttendance(state) {
    state.attendance = {};
  },

  addAttendance(state, text) {
    state.attendances = [text, ...state.attendances];
  },

  updateAttendance(state, attendance) {
    state.attendances = [
      ...state.attendances.map((item) =>
        item._id !== attendance._id
          ? item
          : {
              ...item,
              ...attendance,
            }
      ),
    ];
  },

  deleteAttendance(state, id) {
    state.attendances = [
      ...state.attendances.filter((item) => item._id !== id),
    ];
  },
};

/* -------------------------------------- ACTIONS -------------------------------------- */
const actions = {
  async fetchAttendances({ commit }) {
    const response = await axios.get(URL + 'attendances');
    commit('setAttendances', response.data);
  },

  async fetchAttendance({ commit }, attendanceData) {
    const response = await axios.get(
      URL + 'attendances/' + attendanceData._id,
      attendanceData
    );
    commit('setAttendance', response.data);
  },

  async attendanceAdd({ commit }, attendanceData) {
    await axios
      .post(URL + 'attendances', attendanceData)
      .then((response) => {
        commit('addAttendance', response.data.attendance);
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      });
  },

  async attendanceUpdate({ commit }, attendanceData) {
    await axios
      .put(URL + 'attendances/' + attendanceData._id, attendanceData)
      .then((response) => {
        commit('updateAttendance', response.data);
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      });
  },

  async attendanceDelete({ commit }, attendanceData) {
    await axios
      .delete(URL + 'attendances/' + attendanceData._id, attendanceData)
      .then((response) => {
        commit('deleteAttendance', response.data._id);
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      });
  },

  async attendanceClear({ commit }) {
    commit('clearAttendance');
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

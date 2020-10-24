import axios from 'axios';
const URL = process.env.VUE_APP_BACKEND_URL_LOCAL;
// import apiClient from './api_client';
import router from '../router';


const  state = {
  client: {},
  clients: [],
  errors: []
};

/* -------------------------------------- GETTERS -------------------------------------- */
const getters = {
  getAllClients: state => state.clients,
  getOneClient: state => state.client,
  getErrors: state => state.errors
};

/* -------------------------------------- MUTATIONS -------------------------------------- */
const  mutations = {
  setClients: (state, clients) => (state.clients = clients),

  setClient: (state, client) => (state.client = client),

/*   updateClient (state, user) {
    state.user = user
  }, */
  addClient(state, text) {
    state.clients = [text, ...state.clients]
  },

  updateClient(state, client) {
    state.clients = [
      ...state.clients.map(item => 
          item._id !== client._id ? item : {...item, ...client}
      )
    ] 
  },

  deleteClient (state, id) {
    state.clients = [
      ...state.clients.filter((item) => item._id !== id)
    ];
  },

  setErrors(state, errors) {
    state.errors = errors;
  },
};

/* -------------------------------------- ACTIONS -------------------------------------- */
const actions = {
  async clientAdd({commit}, clientData) {
    console.log('sdgsdgsg')
    await axios.post(URL + 'clients', clientData)
      .then((response) => {
        commit('addClient', response.data.client);
        router.push("/")
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      })
  },

  async fetchClients ({ commit }) {
    const response = await axios.get(URL + "clients");
    commit('setClients', response.data);
  },

  async fetchClient ({ commit }, clientData) {
    const response = await axios.get(URL + "clients/" + clientData._id, clientData);
    commit('setClient ', response.data);
  },

  async clientUpdate({commit}, clientData) {
    await axios.put(URL + 'clients/' + clientData._id, clientData)
      .then((response) => {
        commit('updateClient', response.data);
        router.push("/");
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      })
  },

  async clientDelete({commit}, clientData) {
    await axios.delete(URL + 'clients/' + clientData._id, clientData)
      .then((response) => {
        commit('deleteClient', response.data._id)
      })
      .catch((error) => {
        if (error.response) {
          commit('setErrors', error.response.data.error);
        } else {
          commit('setErrors', error);
        }
      })
  },

  clearErrors({ commit }) {
    commit('setErrors', [])
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
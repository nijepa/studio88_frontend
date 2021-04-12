import axios from "axios";
const URL = process.env.VUE_APP_BACKEND_URL;
// import apiClient from './api_client';
//import router from '../router';

const state = {
  client: {},
  clients: [],
  formType: "",
  clientsPage: 1,
  clientsPageSize: 10,
  fromForm: "clients",
};

/* -------------------------------------- GETTERS -------------------------------------- */
const getters = {
  getAllClients: (state) => state.clients,
  getOneClient: (state) => state.client,
  getFormType: (state) => state.formType,
  getClientsPage: (state) => state.clientsPage,
  getClientsPageSize: (state) => state.clientsPageSize,
  getFromForm: (state) => state.fromForm,
};

/* -------------------------------------- MUTATIONS -------------------------------------- */
const mutations = {
  setClients: (state, clients) => (state.clients = clients),

  setClient: (state, client) => (state.client = client),

  setClientsPage: (state, clientsPage) => (state.clientsPage = clientsPage),

  setClientsPageSize: (state, clientsPageSize) =>
    (state.clientsPageSize = clientsPageSize),

  setFromForm: (state, fromForm) => (state.fromForm = fromForm),

  clearClient(state) {
    state.client = {};
  },

  setFormType: (state, formType) => (state.formType = formType),

  addClient(state, text) {
    state.clients = [text, ...state.clients];
  },

  updateClient(state, client) {
    state.clients = [
      ...state.clients.map((item) =>
        item._id !== client._id
          ? item
          : {
              ...item,
              ...client,
            }
      ),
    ];
  },

  deleteClient(state, id) {
    state.clients = [...state.clients.filter((item) => item._id !== id)];
  },
};

/* -------------------------------------- ACTIONS -------------------------------------- */
const actions = {
  async fetchClients({ commit }) {
    const response = await axios.get(URL + "clients");
    commit("setClients", response.data);
  },

  async fetchClient({ commit }, clientData) {
    const response = await axios.get(
      URL + "clients/" + clientData._id,
      clientData
    );
    commit("setClient", response.data);
  },

  async fetchClientsPage({ commit }, page) {
    commit("setClientsPage", page);
  },

  async fetchClientsPageSize({ commit }, page) {
    commit("setClientsPageSize", page);
  },

  async fetchFromForm({ commit }, form) {
    commit("setFromForm", form);
  },

  async clientAdd({ commit }, clientData) {
    await axios
      .post(URL + "clients", clientData)
      .then((response) => {
        commit("addClient", response.data.client);
        //router.push("/dashboard")
      })
      .catch((error) => {
        if (error.response) {
          commit("setErrors", error.response.data.error);
        } else {
          commit("setErrors", error);
        }
      });
  },

  async clientUpdate({ commit }, clientData) {
    await axios
      .put(URL + "clients/" + clientData._id, clientData)
      .then((response) => {
        commit("updateClient", response.data);
        //router.push("/dashboard");
      })
      .catch((error) => {
        if (error.response) {
          commit("setErrors", error.response.data.error);
        } else {
          commit("setErrors", error);
        }
      });
  },

  async clientDelete({ commit }, clientData) {
    await axios
      .delete(URL + "clients/" + clientData._id, clientData)
      .then((response) => {
        commit("deleteClient", response.data._id);
      })
      .catch((error) => {
        if (error.response) {
          commit("setErrors", error.response.data.error);
        } else {
          commit("setErrors", error);
        }
      });
  },

  async clientClear({ commit }) {
    commit("clearClient");
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

const  state = {
  loading: true,
  inputType: '',
  errors: []
};

/* -------------------------------------- GETTERS -------------------------------------- */
const  getters = {
  loadingState: state => state.loading,
  getErrors: state => state.errors
};

/* -------------------------------------- MUTATIONS -------------------------------------- */
const  mutations = {
  changeLoadingState(state, loading) {
    state.loading = loading;
  },

  setErrors(state, errors) {
    state.errors = errors;
  },
};

/* -------------------------------------- ACTIONS -------------------------------------- */
const actions = {
  setLoadingState({commit}, loading) {
    commit('changeLoadingState', loading);
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
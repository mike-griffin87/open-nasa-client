const state = {
  potd: null,
};

const getters = {
  potd: (state) => state.potd,
};

const actions = {
  async fetchPotd({ commit }) {
    const response = await this._vm.$http.get("/api/potd");
    commit("setPotd", response.data);
  },
};

const mutations = {
  setPotd: (state, potd) => {
    state.potd = potd;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

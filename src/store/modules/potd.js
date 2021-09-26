const state = {
  potd: null,
  archive: [],
};

const getters = {
  potd: (state) => state.potd,
  archive: (state) => state.archive,
};

const actions = {
  async fetchPotd({ commit }, date = null) {
    let url = "/planetary/apod?thumbs=true";
    if (date) url += `&date=${date}`;
    const response = await this._vm.$http.get(url);
    commit("setPotd", response.data);
  },

  async fetchArchive({ commit }, { from, to }) {
    const response = await this._vm.$http.get(
      `/planetary/apod?thumbs=true&start_date=${from}&end_date=${to}`
    );
    commit("setArchive", response.data);
  },
};

const mutations = {
  setPotd: (state, potd) => {
    state.potd = potd;
  },
  setArchive: (state, archive) => {
    state.archive = [...state.archive, ...archive.reverse()];
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

import axios from "axios";

export default {
  install(Vue) {
    Vue.prototype.$http = axios.create({
      baseURL: "https://api.nasa.gov",
      params: {
        api_key: process.env.VUE_APP_POTD_API_KEY,
      },
    });
  },
};

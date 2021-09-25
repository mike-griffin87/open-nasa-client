import axios from "axios";

export default {
  install(Vue) {
    Vue.prototype.$http = axios.create({
      baseURL: "https://api.nasa.gov",
      params: {
        api_key: "pTLlN30L8ASRyCfLpdxtBqrhnKXLXMJzV0fR1YmE",
      },
    });
  },
};

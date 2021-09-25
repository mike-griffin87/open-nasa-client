import axios from "axios";

export default {
  install(Vue) {
    Vue.prototype.$http = axios.create({
      baseURL: "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY",
      queryParams: {
        api_key: "pTLlN30L8ASRyCfLpdxtBqrhnKXLXMJzV0fR1YmE",
      },
    });
  },
};

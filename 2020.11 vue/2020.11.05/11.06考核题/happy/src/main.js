import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "../public/css/common.scss";
import "../public/js/rem.js";
createApp(App)
  .use(store)
  .use(router)
  .mount("#app");

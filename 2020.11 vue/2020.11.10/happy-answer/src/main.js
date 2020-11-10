import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 公共样式
import "../public/css/common.scss";
// 手机适配
import "../public/js/rem";
createApp(App)
  .use(store)
  .use(router)
  .mount("#app");

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// 使用Ant-Design-Vue
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

// 引用axios
import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/";
let app = createApp(App);
app.config.globalProperties.$axios = axios;
app
  .use(router)
  .use(Antd)
  .mount("#app");

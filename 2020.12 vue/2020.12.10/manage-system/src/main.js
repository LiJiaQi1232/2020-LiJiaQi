import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// 使用Ant-Design-Vue
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
// 富文本编辑器
import CKEditor from "@ckeditor/ckeditor5-vue";
//  使用axios
import axios from "axios";
// 本地地址(你在自己的电脑上配置了后台服务和mysql数据库)
// axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/";
// 线上配置好的后台服务
axios.defaults.baseURL = "http://www.wanlum.com:8888/api/private/v1/";

let app = createApp(App);
// 配置全局属性
app.config.globalProperties.$axios = axios;

app
  .use(router)
  .use(Antd)
  .use(CKEditor)
  .mount("#app");

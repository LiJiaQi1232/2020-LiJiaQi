# day22-后台管理系统

## 登录功能

### 用户登录

#### 1.在main中引入axios，设置全局axios

```js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// 使用Ant-Design-Vue
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

// 使用axios
import axios from "axios";
const app = createApp(App);
axios.defaults.baseURL = "http://www.wanlum.com:8888/api/private/v1/";
app.config.globalProperties.$axios = axios;

app
  .use(router)
  .use(Antd)
  .mount("#app");
```

#### 2.点击按钮，发起ajax请求

```js
 methods: {
    handleSubmit() {
      this.$refs.loginForm
        .validate()
        .then(() => {
          console.log(this.$axios);
          // console.log("values", this.form);
          // 收集参数
          let pramas = {
            username: this.form.username,
            password: this.form.password
          };
          // 发送请求

          this.$axios
            .post("/login", pramas)
            .then(function(response) {
              // console.log(response);
              let res = response.data;
              console.log(res);
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(error => {
          console.log("error", error);
        });
    }
  },
```

### 路由导航守卫

#### 1.把获取到的token存储到sessionStorage

```js
  // 3.发送请求
  httpPost(url, payload)
    .then(res => {
      // 如果返回200 则登录成功
      if (res.meta.status == 200) {
        // 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
        //   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
        //   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
        // console.log(res.data);
        message.success(res.meta.msg);
        window.sessionStorage.setItem("token", res.data.token);
        // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
        return this.$router.push("/home");
      }
      // 如果返回400 则弹出登录失败信息
      if (res.meta.status == 400) {
        return message.error(res.meta.msg);
      }
    })
    .catch(err => {
      console.log(err.message);
    });
```

#### 2.设置路由导航守卫

```js
// 定义路由导航守卫
// to: 代表我要去哪个个路由
// from: 代表我来自于哪个路由
// next代表: 下一步要去哪里 如果next() 代表放行  如果next("/login")代表必须跳转到login这个路由
router.beforeEach((to, from, next) => {
  // 获取token
  const isAuthenticated = window.sessionStorage.getItem("token");
  // 如果将要去的地方 不是Login 且没有授权 要强制跳转到Login页面
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next() // 否则放行
})

```

## 二次封装axios

api统一管理,不管接口有多少,所有的接口都可以非常清晰,容易维护.

通常我们的项目会越做越大,页面也会越来越多,如果页面非常的少,直接用axios也没有什么大的影响,那页面组件多了起来,上百个接口呢,这个时候后端改了接口,多加了一个参数什么的呢?那就只有找到那个页面,进去修改.整个过程很繁琐不易于项目的维护和迭代.

这个时候如果我们统一的去管理接口,需要修改某一个接口的时候直接在api里修改对应的请求是不是很方便呢?因为我们用的最多的还是get post请求.我们就可以针对封装.

### 1.在/config.js

```js
// 基础请求地址

// 一般来说 一个项目至少对应一个后端API服务地址,所以需要一个配置文件来粗处这个后端API地址
export const baseHost = {
  API1: {
    // 开发服务器
    dev_host: "http://www.wanlum.com:8888/api/private/v1/",
    // 线上服务器
    prod_host: "http://[ip]:[port]/v[n]/api"
  }
};

```

### 2.在src/api/index.js

```js
// 关于用户的接口
export const user = {
  // 用户登录
  UserLogin: "login"
}

```

### 3.在src/utils/featch.js

```js
// 引入axios库
import axios from "axios";

// 创建 axios 实例
const instance = axios.create({
  // 返回数据类型
  responseType: "json",
  // 超时时间
  timeout: 7000,
  // 最大发包长度
  maxContentLength: 2000,
  // 重试次数
  retry: 3,
  // 重试延时，3秒重试一次
  retryDelay: 3000,
  // 重试条件，默认只要是错误都需要重试
  shouldRetry: () => true
});

// http request 请求拦截器
instance.interceptors.request.use(
  config => {
    // 在headers头上添加参数
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
    const token = "";
    // 判断是否有token令牌
    if (token) {
      config.headers["token"] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// http response 响应拦截器
instance.interceptors.response.use(
  response => {
    // console.log();
    // console.log(response);
    const { status: code } = response.data.meta;
    // 这里可以对后端的一些状态码进行处理
    switch (code) {
      // 如果返回的状态码为200说明接口请求成功
      // 否则的话抛出错误
      case 200:
        return Promise.resolve(response);
      // 服务器状态码不是2开头的情况
      //  这里可以跟你们的后台开发人员协商好统一的错误状态码
      // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
      case 400:
        return Promise.resolve(response);
    }
  },
  error => {
    // 获取error对象的config属性
    const { config } = error;
    // 如果config不存在，或者retry选项没有设置，用reject
    if (!config || !config.retry) return Promise.reject(error);

    // 设置变量来跟踪重试次数
    config.__retryCount = config.__retryCount || 0;

    // 检查我们重试的次数是否超出最大重试次数
    if (config.__retryCount >= config.retry) {
      // 使用reject方法抛出错误
      Notification({
        title: "请求超时",
        message: "当前网络不佳，请稍后刷新重试"
      });

      return Promise.reject(error);
    }

    // 计算重试次数
    config.__retryCount += 1;
    // 创建一个新的Promise 来处理 exponential backoff
    let backoff = new Promise(function(resolve) {
      setTimeout(function() {
        resolve();
      }, config.retryDelay || 1);
    });

    // return the promise in which  recalls axios to retry the request
    return backoff.then(function() {
      return instance(config);
    });
  }
);

export default instance;

```

### 4.在src/utils/http.js

```js
/**
 * 封装GET、POST、PUT、DELETE方法
 */

import featch from "./featch";
import { baseHost } from "@/config";

const env = process.env.NODE_ENV;
let serverURL = "";

/**
 * @method getURL 获取请求地址
 *
 * @param {String} type [请求 地址环境类型]
 */
const getURL = type => {
  switch (env) {
    case "production":
      serverURL = baseHost[type].pro_host;
      break;
    case "development":
      serverURL = baseHost[type].dev_host;
      break;
    case "testing":
      serverURL = baseHost[type].test_host;
      break;
  }

  return serverURL;
};

/**
 * @method httpGet
 *
 * import { httpGet } from '@/utils/http';
 *
 * httpGet('', payload).then().catch();
 *
 * @param {*} url [ 请求地址 ]
 * @param {*} payload [ 请求参数 ]
 * @param {*} type [ 设置 baseURL ]
 */
export const httpGet = async (url, payload, type = "API1") => {
  try {
    serverURL = getURL(type);
    featch.defaults.baseURL = serverURL;
    const response = await featch.get(`${url}`, {
      params: payload
    });

    const result = response.data;
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * @method httpPost
 *
 * import { httpPost } from '@/libraries/axios/http'
 *
 * httpPost('', payload).then().catch()
 *
 * @param { String } url  [ 请求地址 ]
 * @param { Object } payload  [ 请求参数 ]
 */
export const httpPost = async (url, payload, type = "API1") => {
  try {
    serverURL = getURL(type);

    featch.defaults.baseURL = serverURL;

    const response = await featch.post(`${url}`, payload);

    const result = response.data;
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * @method httpPut
 *
 * import { httpPut } from '@/utils/http'
 *
 * httpPut('', payload).then().catch()
 *
 *
 * @param {*} url [ 请求地址 ]
 * @param {*} payload [ 请求参数 ]
 * @param {*} type [ 设置 baseURL ]
 */
export const httpPut = async (url, payload, type = "API1") => {
  try {
    serverURL = getURL(type);
    featch.defaults.baseURL = serverURL;
    const response = await featch.put(`${url}`, payload);

    const result = response.data;
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * @method httpDelete
 *
 * import { httpDelete } from '@/utils/http'
 *
 * httpDelete('', payload).then().catch()
 *
 * @param {*} url [ 请求地址 ]
 * @param {*} payload [ 请求参数 ]
 * @param {*} type [ 设置 baseURL ]
 */
export const httpDelete = async (url, payload, type = "API1") => {
  try {
    serverURL = getURL(type);
    featch.defaults.baseURL = serverURL;
    const response = await featch.delete(`${url}`, {
      data: payload
    });

    const result = response.data;
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

```

#### 在Login.vue中使用

```js
 methods: {
    handleSubmit() {
      this.$refs.loginForm
        .validate()
        .then(() => {
          // 1.请求地址
          const url = user.UserLogin;
          // 2.请求数据
          const payload = {
            username: this.form.username,
            password: this.form.password
          };

          // 3.发送请求
          httpPost(url, payload).then(res => {
              // 如果返回200 则登录成功
              if (res.meta.status == 200) {
                message.success(res.meta.msg);
                // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
                return this.$router.push("/home");
              }

              // 如果返回400 则弹出登录失败信息
              if (res.meta.status == 400) {
                return message.error(res.meta.msg);
              }
            })
            .catch(err => {
              console.log(err.message);
            });
        })
        .catch(error => {
          console.log("error", error);
        });
    }
  },
```

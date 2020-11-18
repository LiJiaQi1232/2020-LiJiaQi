<template>
  <a-layout>
    <a-layout-header></a-layout-header>
    <a-layout-content>
      <a-row :span="6" :offset="9">
        <a-col :span="24">
          <!-- 表单start -->
          <a-form ref="loginForm" :model="form" :rules="rules">
            <!-- 标题start -->
            <a-row class="login-title">
              <a-col :span="24">
                <h2><img src="../assets/logo.png" alt="" /> Manage System</h2>
                <span>Manage System是电商后台管理系统</span>
              </a-col>
            </a-row>
            <!-- 标题end -->

            <!-- 表单内容start -->
            <a-row class="login-form">
              <a-col :span="24">
                <a-tabs :tabBarStyle="{ textAlign: 'center' }">
                  <!-- 账号密码登录 -->
                  <a-tab-pane key="1" tab="账号密码登录">
                    <!-- 用户名 -->
                    <a-form-item :wrapperCol="{ span: 24 }" name="username">
                      <a-input
                        type="username"
                        block
                        size="large"
                        placeholder="请输入用户名"
                        v-model:value="form.username"
                      >
                        <template #prefix
                          ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
                        /></template>
                      </a-input>
                      <!-- 密码 -->
                    </a-form-item>
                    <a-form-item :wrapperCol="{ span: 24 }" name="password">
                      <a-input
                        type="password"
                        block
                        size="large"
                        placeholder="请输入密码"
                        v-model:value="form.password"
                      >
                        <template #prefix
                          ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
                        /></template>
                      </a-input>
                    </a-form-item>
                  </a-tab-pane>
                  <!-- 手机号登录start  -->
                  <a-tab-pane key="2" tab="手机号登录" force-render>
                    <a-form-item :wrapperCol="{ span: 24 }">
                      <a-input
                        type="phone"
                        block
                        size="large"
                        placeholder="请输入手机号"
                      >
                        <template #prefix
                          ><MobileOutlined style="color: rgba(0, 0, 0, 0.25)"
                        /></template>
                      </a-input>
                    </a-form-item>
                    <!-- 验证码 -->
                    <a-row gutter="16">
                      <a-col :span="16">
                        <a-form-item :wrapperCol="{ span: 24 }">
                          <a-input
                            type="phone"
                            block
                            size="large"
                            placeholder="请输入验证码"
                          >
                            <template #prefix
                              ><MailOutlined style="color: rgba(0, 0, 0, 0.25)"
                            /></template>
                          </a-input>
                        </a-form-item>
                      </a-col>
                      <!-- 获取验证码 -->
                      <a-col :span="8">
                        <a-button size="large" block>获取验证码</a-button>
                      </a-col>
                    </a-row>
                  </a-tab-pane>
                  <!-- 手机号登录end -->
                </a-tabs>
              </a-col>
            </a-row>
            <!-- 表单内容end -->

            <!-- 忘记密码 start -->
            <a-row class="login-forget">
              <a-col :span="24">
                <a-form-item :wrapperCol="{ span: 24 }">
                  <a-checkbox>自动登录</a-checkbox>
                  <router-link to="#" style="float: right"
                    >忘记密码？</router-link
                  >
                </a-form-item>
              </a-col>
            </a-row>
            <!-- 忘记密码end -->

            <!-- 确定按钮 start -->
            <a-row>
              <a-col :span="24">
                <a-form-item :wrapperCol="{ span: 24 }">
                  <a-button
                    type="primary"
                    block
                    size="large"
                    @click="handleSubmit"
                  >
                    确定
                  </a-button>
                </a-form-item>
              </a-col>
            </a-row>
            <!-- 确定按钮 end -->

            <!-- 其他登录方式 -->
            <a-row>
              <a-col :span="24">
                <span>其他登录方式</span>
                <AlipayCircleOutlined class="icon-style" />
                <TaobaoCircleOutlined class="icon-style" />
                <WeiboCircleOutlined class="icon-style" />
                <router-link to="#" style="float: right">注册账户</router-link>
              </a-col>
            </a-row>
          </a-form>
          <!-- 表单start -->
        </a-col>
      </a-row>
    </a-layout-content>
    <a-layout-footer></a-layout-footer>
  </a-layout>
</template>

<script>
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  MailOutlined,
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined
} from "@ant-design/icons-vue";
// 引入http方法
import { httpPost } from "@/utils/http";
// 引入接口
import { user } from "@/api";
// 引入全局提示消息框
import { message } from "ant-design-vue";
export default {
  data() {
    return {
      form: {
        username: "admin",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 4, max: 16, message: "长度在4-16之间", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在6-16之间", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleSubmit() {
      // 让这个表单域进行校验
      // then代表成功
      // catch代表失败
      this.$refs.loginForm
        .validate()
        .then(() => {
          // 2.引入请求地址
          let url = user.LoginUser;
          // console.log(url);
          // 1.整理参数
          let params = {
            username: this.form.username,
            password: this.form.password
          };
          // 3.发起请求
          httpPost(url, params)
            .then(response => {
              // 成功时的回调
              let { data, meta } = response;

              //  如果meta中的status为400 说明登录失败
              if (meta.status == 400) {
                return message.error(meta.msg);
              }

              // 如果meta中的status为200 说明登陆成功
              if (meta.status == 200) {
                // 提示一下用户 登录成功
                message.success(meta.msg);
                // 把后端返回的token存到sessionStorage中(sessionStorage存储数据的时间是打开浏览器存储 关闭浏览器 数据消失)
                window.sessionStorage.setItem("token", data.token);
                //  路由跳转到首页
                this.$router.push("/home");
              }
            })
            .catch(err => {
              // 失败时的回调
              throw new Error(err);
            });
        })
        .catch(error => {
          // console.log("失败");
          console.log("error", error);
        });
    }
  },
  components: {
    UserOutlined,
    LockOutlined,
    MobileOutlined,
    MailOutlined,
    AlipayCircleOutlined,
    TaobaoCircleOutlined,
    WeiboCircleOutlined
  }
};
</script>

<style scoped>
.ant-layout {
  background-image: url(../assets/image/bg.svg);
  height: 100%;
}
.ant-layout-header {
  background-color: transparent;
}
.ant-form {
  width: 365px;
  margin: 0 auto;
}
.login-title {
  text-align: center;
}
.login-title h2 {
  position: relative;
  top: 2px;
  font-size: 33px;
  color: rgba(0, 0, 0, 0.85);
  font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-weight: 600;
}
.login-title h2 img {
  height: 44px;
}
.login-title span {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  margin-top: 12px;
}
.icon-style {
  font-size: 24px;
  color: rgba(0, 0, 0, 0.2);
  position: relative;
  top: 2px;
  margin: 0 5px;
}
</style>

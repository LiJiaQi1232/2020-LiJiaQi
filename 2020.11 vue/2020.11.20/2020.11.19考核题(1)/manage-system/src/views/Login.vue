<template>
  <a-layout>
    <a-layout-header></a-layout-header>
    <a-layout-content>
      <!-- 登录框 start -->
      <a-row>
        <a-col :span="6" :offset="9">
          <!-- 表单 start -->
          <a-form :rules="rules" :model="form" ref="loginForm">
            <a-row class="login-title">
              <a-col :span="24">
                <!-- 登录标题 start -->
                <h2><img src="../assets/logo.png" alt="" /> Manage System</h2>
                <span>Ant Design 是西湖区最具影响力的 Web 设计规范</span>
              </a-col>
            </a-row>
            <!-- 登录标题 end -->

            <!-- 登录方式 start -->
            <a-row class="login-form">
              <a-col :span="24">
                <a-tabs :tabBarStyle="{ textAlign: 'center' }">
                  <!-- 账号密码登录 start -->
                  <a-tab-pane key="1" tab="账号密码登录">
                    <!-- 用户名 -->
                    <a-form-item :wrapperCol="{ span: 24 }" name="username">
                      <a-input
                        size="large"
                        type="username"
                        placeholder="请输入用户名"
                        v-model:value="form.username"
                      >
                        <template #prefix
                          ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
                        /></template>
                      </a-input>
                    </a-form-item>
                    <!-- 密码 -->
                    <a-form-item :wrapperCol="{ span: 24 }" name="password">
                      <a-input-password
                        type="password"
                        size="large"
                        placeholder="请输入密码"
                        v-model:value="form.password"
                      >
                        <template #prefix
                          ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
                        /></template>
                      </a-input-password>
                    </a-form-item>
                  </a-tab-pane>
                  <!-- 账号密码登录 end -->

                  <!-- 手机号登录 start-->
                  <a-tab-pane key="2" tab="手机号登录" force-render>
                    <!-- 手机号 -->
                    <a-form-item :wrapperCol="{ span: 24 }">
                      <a-input
                        size="large"
                        type="phone"
                        placeholder="请输入手机号"
                      >
                        <template #prefix
                          ><MobileOutlined style="color: rgba(0, 0, 0, 0.25)"
                        /></template>
                      </a-input>
                    </a-form-item>
                    <!-- 验证码 -->
                    <a-row :gutter="16">
                      <a-col class="gutter-row" :span="16">
                        <a-form-item :wrapperCol="{ span: 24 }">
                          <a-input
                            size="large"
                            type="code"
                            placeholder="请输入验证码"
                          >
                            <template #prefix
                              ><MailOutlined style="color: rgba(0, 0, 0, 0.25)"
                            /></template>
                          </a-input>
                        </a-form-item>
                      </a-col>
                      <a-col class="gutter-row" :span="8">
                        <a-button block size="large" style="padding: 0"
                          >获取验证码</a-button
                        ></a-col
                      >
                    </a-row>
                  </a-tab-pane>
                  <!-- 手机号登录 end-->
                </a-tabs>
              </a-col>
            </a-row>
            <!-- 登录方式 end -->

            <!--  忘记密码 start  -->
            <a-row class="login-forget">
              <a-col :span="24">
                <a-checkbox>自动登录</a-checkbox>
                <router-link to="#" style="float: right">忘记密码?</router-link>
              </a-col>
            </a-row>
            <!-- 忘记密码 end -->

            <!-- 确定按钮 start -->
            <a-row style="margin-top: 24px">
              <a-col :span="24">
                <a-form-item :wrapperCol="{ span: 24 }">
                  <a-button
                    type="primary"
                    block
                    size="large"
                    @click="handleSubmit"
                    >确定</a-button
                  >
                </a-form-item>
              </a-col>
            </a-row>
            <!-- 确定按钮 end -->

            <!-- 其他登录方式 start-->
            <a-row>
              <a-col :span="24">
                <span>其他登录方式 </span
                ><AlipayCircleOutlined class="item-icon" />
                <TaobaoCircleOutlined class="item-icon" />
                <WeiboCircleOutlined class="item-icon" />
                <router-link to="#" style="float: right">注册账户</router-link>
              </a-col>
            </a-row>
            <!-- 其他登录方式 end-->
          </a-form>
          <!-- 表单 end -->
        </a-col>
      </a-row>
      <!-- 登录框 end -->
    </a-layout-content>
    <a-layout-footer></a-layout-footer>
  </a-layout>
</template>

<script>
// 引入httpPost方法
import { httpPost } from "@/utils/http";
// 引入接口
import { user } from "@/api";
// 引入全局消息提示框
import { message } from "ant-design-vue";
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  MailOutlined,
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined
} from "@ant-design/icons-vue";
export default {
  data() {
    return {
      // 定义表单数据模型(对象)
      form: {
        username: "admin",
        password: "123456"
      },
      // 定义表单校验规则
      rules: {
        // 给那个字段添加什么规则
        username: [
          // required 必须的
          // trigger 啥时候触发
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 4, max: 16, message: "长度在4-16个字符之间", trigger: "blur" }
        ],
        password: [
          // required 必须的
          // trigger 啥时候触发
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在6-16个字符之间", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm
        .validate()
        .then(() => {
          // console.log("values", this.form);
          // 引入请求地址
          let url = user.LoginUsers;
          // 整理参数
          let params = {
            username: this.form.username,
            password: this.form.password
          };
          // 发送请求
          httpPost(url, params)
            .then(response => {
              // console.log(response);
              let { data, meta } = response;
              // 如果meta中的status为400则表示登录没有成功
              if (meta.status == 400) {
                return message.error(meta.msg);
              }
              if (meta.status == 200) {
                //  提示用户登录成功
                message.success(meta.msg);
                //  将返回的token 存储到sessionStorage中
                window.sessionStorage.setItem("token", data.token);
                // 跳转到首页
                this.$router.push("/home");
              }
            })
            .catch(err => {
              throw new Error(err);
            });
        })
        .catch(error => {
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
  height: 100%;
  background-image: url(../assets/image/bg.svg);
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

.login-title img {
  height: 44px;
}

.login-title span {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  margin-top: 12px;
}

.item-icon {
  font-size: 24px;
  color: rgba(0, 0, 0, 0.2);
  position: relative;
  top: 4px;
  margin: 0 5px;
}

.item-icon:hover {
  color: #1890ff;
}
</style>

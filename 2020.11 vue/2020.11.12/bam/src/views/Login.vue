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
            <!-- 内容start -->
            <a-row class="login-form">
              <a-col :span="24">
                <a-tabs :tabBarStyle="{ textAlign: 'center' }">
                  <!-- 账号密码登录 -->
                  <a-tab-pane key="1" tab="账号密码登录">
                    <!-- 用户名 -->
                    <a-form-item :wrapperCol="{ span: 24 }" name="username">
                      <a-input
                        placeholder="请输入用户名"
                        type="username"
                        size="large"
                        block
                        v-model:value="form.username"
                      >
                        <template #prefix
                          ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
                        /></template>
                      </a-input>
                    </a-form-item>
                    <!-- 密码 -->
                    <a-form-item :wrapperCol="{ span: 24 }" name="password">
                      <a-input
                        type="password"
                        placeholder="请输入密码"
                        size="large"
                        block
                        v-model:value="form.password"
                      >
                        <template #prefix
                          ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
                        /></template>
                      </a-input>
                    </a-form-item>
                  </a-tab-pane>
                  <!-- 手机号登录 -->
                  <a-tab-pane key="2" tab="手机号登录" force-render>
                    <!-- 手机号 -->
                    <a-form-item :wrapperCol="{ span: 24 }">
                      <a-input
                        type="phone"
                        placeholder="请输入手机号"
                        size="large"
                        block
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
                            placeholder="请输入验证码"
                            size="large"
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
                </a-tabs>
              </a-col>
            </a-row>
            <!-- 内容end -->
            <!-- 忘记密码start -->
            <a-row class="login-forget">
              <a-col :span="24">
                <a-form-item :wrapperCol="{ span: 24 }">
                  <!-- 自动登录 -->
                  <a-checkbox> 自动登录 </a-checkbox>
                  <router-link to="#" style="float: right"
                    >忘记密码？</router-link
                  >
                </a-form-item>
              </a-col>
            </a-row>
            <!-- 忘记密码end -->
            <!-- 确定按钮 -->
            <a-row>
              <a-col :span="24">
                <a-form-item :wrapperCol="{ span: 24 }">
                  <a-button
                    type="primary"
                    size="large"
                    block
                    @click="handleSubmit"
                    >确定
                  </a-button>
                </a-form-item>
              </a-col>
            </a-row>
            <!-- 其他登录方式 start -->
            <a-row>
              <a-col :span="24">
                <span>其他登录方式</span>
                <AlipayCircleOutlined class="icon-style" />
                <TaobaoCircleOutlined class="icon-style" />
                <WeiboCircleOutlined class="icon-style" />
                <router-link to="#" style="float:right">注册账户</router-link>
              </a-col>
            </a-row>
            <!-- 其他登录方式 end-->
          </a-form>
          <!-- 表单end -->
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
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
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
      this.$refs.loginForm
        .validate()
        .then(() => {
          console.log("values", this.form);
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
.ant-form {
  width: 365px;
  margin: 0 auto;
}
.icon-style {
  font-size: 24px;
  color: rgba(0, 0, 0, 0.2);
  position: relative;
  top: 2px;
  margin: 0 5px;
}
</style>

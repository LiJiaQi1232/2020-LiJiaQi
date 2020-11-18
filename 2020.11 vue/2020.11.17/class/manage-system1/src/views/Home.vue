<template>
  <!-- home页面 start -->
  <a-layout class="home">
    <!-- 侧边栏 start -->
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="home-logo">
        <router-link to="/home">
          <img src="@/assets/logo.png" alt="" /><span>后台管理系统</span>
        </router-link>
      </div>
      <a-menu theme="dark" mode="inline">
        <a-sub-menu key="sub1">
          <template #title>
            <span><user-outlined /><span>用户管理</span></span>
          </template>
          <a-menu-item key="1">
            <appstore-outlined /> <span><router-link to="/userlist">用户列表</router-link> </span></a-menu-item
          >
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <!-- 侧边栏 end -->

    <!-- 内容区域 start -->
    <a-layout>
      <!-- 内容区域的头部start -->
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />

        <a-button @click="handleLogOut" style="float:right; margin: 16px 24px;">退出</a-button>
      </a-layout-header>
      <!-- 内容区域的头部end -->

      <!-- 内容区域的内容部分 start  -->
      <a-layout-content style="margin: 0 16px">
        <!-- 组件渲染 start -->
          <router-view></router-view>
        <!-- 组件渲染 end -->
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        ManageSystem ©2018 Created by wanlum
      </a-layout-footer>
      <!-- 内容区域的内容部分 end  -->
    </a-layout>
    <!-- 内容区域 end -->
  </a-layout>
  <!-- home页面 end -->
</template>

<script>
// 引入菜单小图标
import {
  UserOutlined,
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";

export default {
  data() {
    return {
      // 折叠
      collapsed: false,
    };
  },
  methods: {
    // 退出
    handleLogOut(){
      // 删除token
      window.sessionStorage.removeItem("token");
      // 跳转页面到Login
      this.$router.push("/login");
    }
  },
  components: {
    UserOutlined,
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },
};
</script>

<style>
.home {
  height: 100%;
}

.home-logo {
  height: 32px;
  margin: 16px;
  overflow: hidden;
}

.home-logo a {
  display: block;
  width: 100%;
  height: 100%;
}

.home-logo img {
  height: 100%;
}

.home-logo span {
  color: #fff;
  margin-left: 15px;
}

.ant-layout-sider-collapsed .home-logo span {
  display: none;
}

.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
</style>

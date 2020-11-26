<template>
  <a-layout class="home">
    <!-- 侧边栏start -->
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="home-logo">
        <router-link to="/home">
          <img src="../assets/logo.png" alt="" />
          <span>后台管理系统</span>
        </router-link>
      </div>
      <a-menu
        theme="dark"
        mode="inline"
        :openKeys="openKeys"
        @openChange="onOpenChange"
      >
        <a-sub-menu
          :key="item.id"
          :index="index"
          v-for="(item, index) in menuList"
        >
          <template #title v-if="item.path == 'users'">
            <span
              ><UserOutlined /><span>{{ item.authName }}</span></span
            >
          </template>
          <template #title v-else-if="item.path == 'rights'">
            <span
              ><CodeSandboxOutlined /><span>{{ item.authName }}</span></span
            >
          </template>
          <template #title v-else-if="item.path == 'goods'">
            <span
              ><ShoppingOutlined /><span>{{ item.authName }}</span></span
            >
          </template>
          <template #title v-else-if="item.path == 'orders'">
            <span
              ><ContainerOutlined /><span>{{ item.authName }}</span></span
            >
          </template>
          <template #title v-else-if="item.path == 'reports'">
            <span
              ><AreaChartOutlined /><span>{{ item.authName }}</span></span
            >
          </template>

          <a-menu-item :key="subitem.id" v-for="subitem in item.children">
            <span>
              <router-link :to="subitem.path" style="color: #fff">
                <AppstoreOutlined />{{ subitem.authName }}</router-link
              >
            </span>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <!-- 侧边栏end -->
    <!-- 内容区域start -->
    <a-layout>
      <!-- 头部start -->
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
        <!-- 退出按钮 -->
        <a-button
          type="primary"
          @click="handleLogOut"
          style="float: right; margin: 15px"
        >
          退出
        </a-button>
      </a-layout-header>
      <!-- 头部end -->
      <a-layout-content style="margin: 0 16px">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
    <!-- 内容区域end -->
  </a-layout>
</template>

<script>
// 引入httpGet方法
import { httpGet } from "@/utils/http";
// 引入接口
import { rights } from "@/api";

// 引入小图标
import {
  UserOutlined,
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CodeSandboxOutlined,
  ShoppingOutlined,
  ContainerOutlined,
  AreaChartOutlined
} from "@ant-design/icons-vue";
export default {
  created() {
    this.getMunuList();
  },
  data() {
    return {
      // 折叠
      collapsed: false,
      openKeys: [],
      // 菜单数据
      menuList: [],
      rootSubmenuKeys: []
    };
  },
  methods: {
    // 点击菜单，收起其他展开的所有菜单，保持菜单聚焦简洁。
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        key => this.openKeys.indexOf(key) === -1
      );
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    // 退出
    handleLogOut() {
      // 删除token
      window.sessionStorage.removeItem("token");
      // 跳转到登录页
      this.$router.push("/login");
    },
    getMunuList() {
      httpGet(rights.AsideMenus)
        .then(response => {
          // console.log(response);
          let { data, meta } = response;
          // 如果meta中的status为200则表示请求成功
          if (meta.status == 200) {
            // 将data中的数据给menuList
            this.menuList = data;
            this.menuList.forEach(item => {
              this.rootSubmenuKeys.push(item.id);
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  components: {
    UserOutlined,
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    CodeSandboxOutlined,
    ShoppingOutlined,
    ContainerOutlined,
    AreaChartOutlined
  }
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
  width: 100%;
  height: 100%;
  display: block;
}
.home-logo img {
  height: 100%;
}
.home-logo span {
  color: #fff;
  margin-left: 15px;
}
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
</style>

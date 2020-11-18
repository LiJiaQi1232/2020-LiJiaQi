<template>
  <!-- home页面start -->
  <a-layout class="home">
    <!--  侧边栏start-->
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="home-logo">
        <router-link to="/home">
          <img src="@/assets/logo.png" alt="" />
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
          <!-- 根据一级菜单的路由名称 渲染小图标 start -->
          <template #title v-if="item.path == 'users'">
            <span>
              <user-outlined /><span>{{ item.authName }}</span>
            </span>
          </template>
          <template #title v-else-if="item.path == 'rights'">
            <span>
              <CodeSandboxOutlined /><span>{{ item.authName }}</span>
            </span>
          </template>
          <template #title v-else-if="item.path == 'goods'">
            <span>
              <ShoppingOutlined /><span>{{ item.authName }}</span>
            </span>
          </template>
          <template #title v-else-if="item.path == 'orders'">
            <span>
              <ContainerOutlined /><span>{{ item.authName }}</span>
            </span>
          </template>
          <template #title v-else-if="item.path == 'reports'">
            <span>
              <AreaChartOutlined /><span>{{ item.authName }}</span>
            </span>
          </template>
          <!-- 根据一级菜单的路由名称 渲染小图标 end-->
          <a-menu-item
            :key="subitem.id"
            :subindex="subindex"
            v-for="(subitem, subindex) in item.children"
          >
            <appstore-outlined /><span>
              <router-link :to="subitem.path" style="color: #fff">
                {{ subitem.authName }}
              </router-link></span
            >
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <!--  侧边栏end-->

    <!-- 内容区域 start -->
    <a-layout>
      <!-- 内容区域的头部 start -->
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
        <a-button @click="handleLogOut" style="float: right; margin: 16px 24px"
          >退出</a-button
        >
      </a-layout-header>
      <!-- 内容区域的头部 end -->

      <!-- 内容部分 start -->
      <a-layout-content style="margin: 0 16px">
        <!-- 组件渲染start -->
        <router-view></router-view>
        <!-- 组件渲染end -->
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        ManageSystem ©2018 Created by Ant UED
      </a-layout-footer>
      <!-- 内容部分 end -->
    </a-layout>
    <!-- 内容区域 end -->
  </a-layout>

  <!-- home页面end -->
</template>

<script>
// 引入请求方法
import { httpGet } from "@/utils/http";
// 引入请求路径
import { rights } from "@/api";
// 引入菜单小图标
import {
  UserOutlined,
  AppstoreOutlined,
  MenuUnfoldOutlined,
  CodeSandboxOutlined,
  MenuFoldOutlined,
  ShoppingOutlined,
  ContainerOutlined,
  AreaChartOutlined
} from "@ant-design/icons-vue";
export default {
  created() {
    this.getMenuList();
  },
  data() {
    return {
      //折叠
      collapsed: false,
      // 侧边栏菜单
      menuList: [],
      // 默认打开的那一项
      openKeys: [],
      // 所有项
      rootSubmenuKeys: []
    };
  },
  methods: {
    // 退出
    handleLogOut() {
      // 删除token
      window.sessionStorage.removeItem("token");
      // 跳转页面到Login
      this.$router.push("/login");
    },
    getMenuList() {
      httpGet(rights.AsideMenus)
        .then(response => {
          // console.log(response);
          let { data, meta } = response;

          // 判断数据是否获取成功
          if (meta.status == 200) {
            this.menuList = data;
            this.menuList.forEach(item => {
              this.rootSubmenuKeys.push(item.id);
            });
            // console.log(this.rootSubmenuKeys);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        key => this.openKeys.indexOf(key) === -1
      );
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
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
  overflow: hidden;
  margin: 16px;
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

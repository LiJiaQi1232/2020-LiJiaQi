<template>
  <a-layout>
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item
        ><router-link to="/home" style="font-weight: bold; color: #000"
          >首页</router-link
        ></a-breadcrumb-item
      >
      <a-breadcrumb-item>权限管理</a-breadcrumb-item>
      <a-breadcrumb-item>权限列表</a-breadcrumb-item>
    </a-breadcrumb>
    <a-table
      :row-key="(record) => record.id"
      :columns="rightsColumns"
      :data-source="rightsData"
      :pagination="false"
      bordered
    >
      <!-- 序号 -->
      <template #index="{ index }">
        {{ index + 1 }}
      </template>
      <!-- 权限等级 -->
      <template #level="{ record }">
        <a-tag v-if="record.level == 0" color="blue"> 一级 </a-tag>
        <a-tag v-else-if="record.level == 1" color="green"> 二级 </a-tag>
        <a-tag v-else-if="record.level == 2" color="orange"> 三级 </a-tag>
      </template>
    </a-table>
  </a-layout>
</template>

<script>
// 引入请求方法 httpGet
import { httpGet } from "@/utils/http";
// 引入请求路径
import { rights } from "@/api";
export default {
  created() {
    this.handleGetRights();
  },
  data() {
    return {
      rightsColumns: [
        { title: "#", key: "index", slots: { customRender: "index" } },
        { title: "权限名称", dataIndex: "authName" },
        { title: "路径", dataIndex: "path" },
        { title: "权限等级", key: "level", slots: { customRender: "level" } },
      ],
      rightsData: [],
    };
  },
  methods: {
    handleGetRights() {
      httpGet(rights.GetRights)
        .then((res) => {
          // console.log(res);
          let { meta, data } = res;
          if (meta.status == 200) {
            this.rightsData = data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>
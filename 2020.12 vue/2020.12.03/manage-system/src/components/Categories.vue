<template>
  <a-layout>
    <!-- 面包屑导航 -->
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item
        ><router-link to="/home" style="font-weight: bold; color: #000"
          >首页</router-link
        ></a-breadcrumb-item
      >
      <a-breadcrumb-item>商品管理</a-breadcrumb-item>
      <a-breadcrumb-item>商品分类</a-breadcrumb-item>
    </a-breadcrumb>
    <a-card>
      <!-- 添加分类按钮 -->
      <a-row style="margin-bottom: 24px">
        <a-col :span="24">
          <!-- 添加角色 -->
          <a-button type="primary"> 添加分类 </a-button>
        </a-col>
      </a-row>
      <!-- 表格 -->
      <a-table
        :columns="table.Cols"
        :data-source="table.Data"
        bordered
        :pagination="false"
        :row-key="(record) => record.cat_id"
        :expandIconColumnIndex="1"
      >
        <!-- 序号-->
        <template #index="{ record, index }">
          <span v-if="record.cat_level == 0">{{ index + 1 }}</span>
        </template>
        <!-- 是否有效 -->
        <template #isDeleted="{ record }">
          <CheckCircleTwoTone
            v-if="record.cat_deleted == false"
            twoToneColor="#52c41a"
          />
          <CloseCircleTwoTone
            v-if="record.cat_deleted == true"
            twoToneColor="#c41a16"
          />
        </template>
        <!-- 排序 -->
              <template #level="{ record }">
        <!-- {{ record }} -->

        <a-tag  v-if="record.cat_level == 0" color="blue">一级</a-tag>
        <a-tag v-else-if="record.cat_level == 1" color="green">二级</a-tag>
        <a-tag v-else-if="record.cat_level == 2" color="orange">三级</a-tag>
      </template>
        <!-- 操作 -->
         <!-- 操作 -->
        <template #operation>
          <!-- 编辑 -->
          <a-button type="primary" >
            <EditOutlined />
          </a-button>
          <!-- 删除 -->
          <a-button type="danger" style="margin: 0 6px" >
            <DeleteOutlined
          /></a-button>
        </template>
      </a-table>
    </a-card>
  </a-layout>
</template>

<script>
// 导入接口
import { goods } from "@/api";
// 导入请求方法
import { httpGet } from "@/utils/http";
// 引入菜单小图标
import { CheckCircleTwoTone, CloseCircleTwoTone,EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
export default {
  created() {
    this.GetCategories();
  },
  data() {
    return {
      table: {
        Cols: [
          { title: "#", key: "index", slots: { customRender: "index" } },
          { title: "分类名称", dataIndex: "cat_name" },
          {
            title: "是否有效",
            key: "cat_deleted",
            slots: { customRender: "isDeleted" },
          },
          {
            title: "排序",
            key: "cat_level",
            slots: { customRender: "level" },
          },
          {
            title: "操作",
            key: "operation",
            slots: { customRender: "operation" },
          },
        ],
        Data: [],
      },
      pagination: {
        pagenum: 1,
        pagesize: 10,
        total: 0,
      },
    };
  },
  methods: {
    GetCategories() {
      httpGet(goods.GetCategories, {
        pagenum: this.pagination.pagenum,
        pagesize: this.pagination.pagesize,
      })
        .then((res) => {
          let { meta, data } = res;
          if (meta.status == 200) {
            this.pagination.total = data.total;
            this.table.Data = data.result;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: {
    CheckCircleTwoTone,
    CloseCircleTwoTone,
    EditOutlined, DeleteOutlined
  },
};
</script>

<style>
</style>
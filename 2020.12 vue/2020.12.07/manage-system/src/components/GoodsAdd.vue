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
      <a-breadcrumb-item>添加商品</a-breadcrumb-item>
    </a-breadcrumb>

    <!-- 表格 -->
    <a-card>
      <!-- 提示信息 -->
      <a-alert message="添加商品信息" type="info" show-icon />
      <!-- 步骤条 -->
      <a-row>
        <a-col :span="20" :offset="2">
          <a-steps
            direction="horizontal"
            labelPlacement="vertical"
            size="small"
            style="margin-top: 24px"
            :current="0"
          >
            <a-step title="基本信息" />
            <a-step title="商品参数" />
            <a-step title="商品属性" />
            <a-step title="商品图片" />
            <a-step title="商品内容" />
            <a-step title="完成" />
          </a-steps>
        </a-col>
      </a-row>
      <!-- tab标签 -->
      <a-form
        layout="vertical"
        :model="addGoodsModel"
        :rules="addGoodsRules"
        ref="addGoodsRef"
      >
        <a-tabs
          tabPosition="left"
          style="margin-top: 24px"
          :activeKey="activeKey"
          @change="handleTabsChange"
        >
          <a-tab-pane key="0" tab="基本信息">
            <a-form-item required label="商品名称" name="goods_name">
              <a-input v-model:value="addGoodsModel.good_name" />
            </a-form-item>
            <a-form-item required label="商品价格" name="goods_price">
              <a-input v-model:value="addGoodsModel.goods_price" />
            </a-form-item>
            <a-form-item required label="商品重量" name="goods_weight">
              <a-input v-model:value="addGoodsModel.goods_weight" />
            </a-form-item>
            <a-form-item required label="商品数量" name="goods_number">
              <a-input v-model:value="addGoodsModel.goods_number" />
            </a-form-item>
            <a-form-item required label="商品分类" name="goods_cat">
              <!-- 级联选择器 -->
              <a-cascader
                v-model:value="addGoodsModel.goods_cat"
                :options="options"
                placeholder="请选择"
                :fieldNames="{
                  label: 'cat_name',
                  value: 'cat_id',
                  children: 'children',
                }"
                @change="handleCascaderChange"
              />
            </a-form-item>
          </a-tab-pane>
          <a-tab-pane key="1" tab="商品参数">Content of Tab Pane 2</a-tab-pane>
          <a-tab-pane key="2" tab="商品属性">Content of Tab Pane 3</a-tab-pane>
          <a-tab-pane key="2" tab="商品图片">
            Content of Tab Pane 4
          </a-tab-pane>
          <a-tab-pane key="2" tab="商品内容"> Content of Tab Pane 5</a-tab-pane>
        </a-tabs>
      </a-form>
    </a-card>
  </a-layout>
</template>

<script>
// 引入请求方法 httpGet
import { httpGet } from "@/utils/http";

// 引入请求路径
import { goods } from "@/api";
import { message } from "ant-design-vue";
export default {
  created() {
    this.handleReadCates();
  },
  data() {
    return {
      // 数据模型
      addGoodsModel: {
        goods_name: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_cat: [],
        goods_introduce: "",
        pics: [],
        attrs: [],
      },
      addGoodsRules: {
        goods_name: [
          { required: true, message: "商品名称不能为空", trigger: "blur" },
        ],
        goods_price: [
          { required: true, message: "商品价格不能为空", trigger: "blur" },
        ],
        goods_weight: [
          { required: true, message: "商品重量不能为空", trigger: "blur" },
        ],
        goods_number: [
          { required: true, message: "商品数量不能为空", trigger: "blur" },
        ],
        goods_cat: [
          {
            type: "array",
            required: true,
            message: "商品分类不能为空",
            trigger: "blur",
          },
        ],
      },
      options: [],
      activeKey: "0",
      cate_id: "",
    };
  },
  methods: {
    handleReadCates() {
      httpGet(goods.GetCategories)
        .then((res) => {
          // console.log(res);
          let { meta, data } = res;
          if (meta.status == 200) {
            this.options = data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleTabsChange(activeKey) {
      // 如果activeKey不是1 且 addGoodsModel.goods_cat 的长度不为三，那么就让activeKey为1，还要提示用户
      if (activeKey !== "0" && this.addGoodsModel.goods_cat.length != 3) {
        message.error("请先选择商品分类");
        this.activeKey = "0";
      } else {
        this.activeKey = activeKey;
        if (activeKey == "1") {
          console.log(11111);
          httpGet(`categories/${this.cate_id}/attributes/`, { sel: "many" })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    },
    handleCascaderChange(value) {
      if (value.length == 3) {
        this.cate_id = value[value.length - 1];
      }
    },
  },
};
</script>

<style>
</style>
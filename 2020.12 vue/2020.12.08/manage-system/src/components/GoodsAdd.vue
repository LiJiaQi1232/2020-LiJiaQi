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
            :current="Number(activeKey)"
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

      <!-- tab标签页 -->
      <a-form
        layout="vertical"
        :model="addGoodsModel"
        :rules="addGoodsRules"
        ref="addGoodsRef"
      >
        <a-tabs
          style="margin-top: 24px"
          tab-position="left"
          :activeKey="activeKey"
          @change="handleTabsChange"
          @tabClick="handleTabsClick"
        >
          <a-tab-pane key="0" tab="基本信息">
            <!-- 基本信息 -->
            <a-form-item required label="商品名称" name="goods_name">
              <a-input v-model:value="addGoodsModel.goods_name" />
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
              <a-cascader
                v-model:value="addGoodsModel.goods_cat"
                :options="options"
                :fieldNames="{
                  label: 'cat_name',
                  value: 'cat_id',
                  children: 'children'
                }"
                @change="handleCascaderChange"
                placeholder="请选择"
              />
            </a-form-item>
          </a-tab-pane>
          <a-tab-pane key="1" tab="商品参数">
            <a-form-item
              :label="item.attr_name"
              :key="item.attr_id"
              v-for="item in manyData"
            >
              <a-checkbox-group
                v-model:value="item.attr_vals"
                :options="item.attr_vals"
              />
            </a-form-item>
          </a-tab-pane>
          <a-tab-pane key="2" tab="商品属性">
            <a-form-item
              :label="item.attr_name"
              :key="item.attr_id"
              v-for="item in onlyData"
            >
              <a-input v-model:value="item.attr_vals"></a-input>
            </a-form-item>
          </a-tab-pane>
          <a-tab-pane key="3" tab="商品图片">
            <!-- accept="image/*接受任何图片类型上传 -->
            <!-- action 上传的地址 -->
            <!--  :headers="headersObj" 上传图片的时候 需要token，因此在headers中传一个对象获取token -->
            <!-- @change 监听图片上传状态  上传中、完成、失败都会调用这个函数。-->
            <a-upload
              accept="image/*"
              action="http://www.wanlum.com:8888/api/private/v1/upload"
              listType="picture"
              :headers="headersObj"
              @change="handleUploadChange"
              @preview="handleUploadPreview"
              :remove="handleUploadRemove"
            >
              <a-button> <upload-outlined /> 上传图片 </a-button>
            </a-upload>
          </a-tab-pane>
          <a-tab-pane key="4" tab="商品内容">
            <ckeditor
              :editor="editor"
              v-model="addGoodsModel.goods_introduce"
              @blur="onEditorBlur"
            ></ckeditor>
            <!-- 添加商品按钮 -->
            <a-button type="primary" @click="handleAddGoods">添加商品</a-button>
          </a-tab-pane>
        </a-tabs>
      </a-form>
    </a-card>
    <!-- 预览图片 -->
    <a-modal
      title="图片预览"
      :visible="previewVisible"
      :footer="null"
      @cancel="handleCancel"
    >
      <img alt="example" style="width: 100%" :src="previewPath" />
    </a-modal>
  </a-layout>
</template>

<script>
// 导入请求地址
import { goods } from "@/api";
// 引入全局提示框
import { message } from "ant-design-vue";
// 导入请求方式
import { httpGet, httpPost } from "@/utils/http";
import { UploadOutlined } from "@ant-design/icons-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import _ from "lodash";
export default {
  data() {
    return {
      // 数据模型
      addGoodsModel: {
        goods_name: "",
        goods_price: "",
        goods_weight: "",
        goods_number: "",
        goods_cat: [],
        goods_introduce: "",
        pics: [],
        attrs: []
      },
      // 数据校验规则
      addGoodsRules: {
        goods_name: [
          { required: true, message: "商品名称不能为空", trigger: "blur" }
        ],
        goods_price: [
          { required: true, message: "商品价格不能为空", trigger: "blur" }
        ],
        goods_weight: [
          { required: true, message: "商品重量不能为空", trigger: "blur" }
        ],
        goods_number: [
          { required: true, message: "商品数量不能为空", trigger: "blur" }
        ],
        goods_cat: [
          {
            type: "array",
            required: true,
            message: "商品分类不能为空",
            trigger: "blur"
          }
        ]
      },
      options: [],
      activeKey: "0",
      cate_id: "",
      manyData: [],
      onlyData: [],
      headersObj: {
        Authorization: window.sessionStorage.getItem("token")
      },
      previewPath: "",
      previewVisible: false,
      editor: ClassicEditor
    };
  },
  created() {
    this.handleReadCates();
  },
  methods: {
    handleReadCates() {
      httpGet(goods.GetCategories)
        .then(response => {
          let { meta, data } = response;

          if (meta.status == 200) {
            this.options = data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleTabsChange(activeKey) {
      // 如果activeKey不是1且addGoodsModel.goods_cat的长度不为三 那么就让activeKey为1,还要提示用户
      if (activeKey !== "0" && this.addGoodsModel.goods_cat.length !== 3) {
        message.error("请先选择商品分类");
        this.activeKey = "0";
      } else {
        this.activeKey = activeKey;
      }
    },
    handleTabsClick(activeKey) {
      if (activeKey == "1") {
        httpGet(`categories/${this.cate_id}/attributes`, { sel: "many" })
          .then(response => {
            let { meta, data } = response;
            if (meta.status == 200) {
              data.forEach(ele => {
                ele.attr_vals =
                  ele.attr_vals.length == 0 ? [] : ele.attr_vals.split(" ");
              });
              this.manyData = data;
            }
          })
          .catch(error => {
            console.log(error);
          });
      }

      if (activeKey == "2") {
        httpGet(`categories/${this.cate_id}/attributes`, { sel: "only" })
          .then(response => {
            // console.log(response);
            let { meta, data } = response;
            if (meta.status == 200) {
              this.onlyData = data;
              console.log(this.onlyData);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    handleCascaderChange(value) {
      // console.log(value);
      if (value.length == 3) {
        this.cate_id = value[value.length - 1];
        // console.log(this.cate_id);
      }
    },
    handleUploadChange(file) {
      // console.log(file);
      if (file.file.status == "done") {
        let { fileList } = file;
        let arr = [];
        fileList.forEach(item => {
          arr.push({ pic: item.response.data.tmp_path });
        });
        this.addGoodsModel.pics = arr;
        console.log(this.addGoodsModel.pics);
      }
    },
    // 预览图片
    handleUploadPreview(file) {
      this.previewPath = file.response.data.url.replace(
        /127.0.0.1/,
        "www.wanlum.com"
      );
      this.previewVisible = true;
    },
    handleCancel() {
      this.previewVisible = false;
    },
    // 删除
    handleUploadRemove(file) {
      console.log(file);
      // 在pics中查找和即将删除的路径一样的图片的索引
      let index = this.addGoodsModel.pics.findIndex(
        item => item.pic == file.response.data.tmp_path
      );
      // 通过索引把图片的临时路径从数组中删除
      this.addGoodsModel.pics.splice(index, 1);
    },
    onEditorBlur() {
      console.log(this.addGoodsModel.goods_introduce);
    },
    // 添加商品
    handleAddGoods() {
      // 1.表单校验
      this.$refs.addGoodsRef
        .validate()
        .then(() => {
          let form = _.cloneDeep(this.addGoodsModel);
          // 2.收集分类数据 goods_cat
          form.goods_cat = form.goods_cat.join(",");
          // 3.收集动态参数
          this.manyData.forEach(item => {
            form.attrs.push({
              attr_id: item.attr_id,
              attr_value: item.attr_vals.join(" ")
            });
          });
          // 收集静态参数
          this.onlyData.forEach(item => {
            form.attrs.push({
              attr_id: item.attr_id,
              attr_value: item.attr_vals
            });
          });
          // 发请求
          httpPost(goods.AddGoods, form)
            .then(res => {
              let { meta } = res;
              if (meta.status == 201) {
                message.success(meta.msg);
                this.$router.push("/goods");
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          message.error("您还有未填完的项");
          console.log(err);
        });
    }
  },
  components: {
    UploadOutlined
  }
};
</script>

<style>
.ck-editor__editable {
  min-height: 400px;
}
</style>

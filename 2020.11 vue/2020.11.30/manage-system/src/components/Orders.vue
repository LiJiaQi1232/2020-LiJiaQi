<template>
  <a-layout>
    <!-- 面包屑导航 -->
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item
        ><router-link to="/home" style="font-weight: bold; color: #000"
          >首页</router-link
        ></a-breadcrumb-item
      >
      <a-breadcrumb-item>订单管理</a-breadcrumb-item>
      <a-breadcrumb-item>订单列表</a-breadcrumb-item>
    </a-breadcrumb>
    <!-- 内容 -->
    <a-card>
      <!-- 搜索框 -->
      <a-row style="margin-bottom: 24px">
        <a-col :span="8">
          <a-input-search placeholder="请选择">
            <template #enterButton>
              <a-button> 搜索 </a-button>
            </template>
          </a-input-search>
        </a-col>
      </a-row>
      <!-- 表格 -->
      <a-table
        :columns="table.Cols"
        :data-source="table.Data"
        :row-key="(record) => record.order_id"
        bordered
        :pagination="false"
      >
        <!-- 序号 -->
        <template #index="{ index }">
          {{ index + 1 }}
        </template>
        <!-- 是否付款 -->
        <template #pay_status="{ record }">
          <a-tag color="pink" v-if="record.pay_status == 0"> 未付款 </a-tag>
          <a-tag color="green" v-if="record.pay_status == 1"> 已付款 </a-tag>
        </template>
        <!-- 操作 -->
        <template #operation>
          <a-button
            type="primary"
            style="margin-right: 10px"
            @click="handleReadAddress"
          >
            <template #icon>
              <EditOutlined />
            </template>
          </a-button>
          <!-- 地址 -->
          <a-button class="ant-green">
            <template #icon>
              <EnvironmentOutlined />
            </template>
          </a-button>
        </template>
      </a-table>
      <!-- 分页 -->
      <a-pagination
        style="margin-top: 25px"
        v-model:current="pagination.pagenum"
        :total="pagination.total"
        :show-total="(total) => `共 ${pagination.total} 条`"
        show-size-changer
        @showSizeChange="onShowSizeChange"
        :page-size-options="pagination.pageSizeOptions"
        :defaultPageSize="10"
        v-model:pageSize="pagination.pagesize"
        @change="handlePageChange"
        show-quick-jumper
      />
    </a-card>
    <!-- 分配角色弹出框 -->
    <a-modal title="修改地址" v-model:visible="address.visible">
      <a-form
        :model="address.FormModel"
        :rules="address.FormRules"
        ref="address.editFormRef"
      >
        <a-form-item ref="name" label="省市区/县" name="ssq" required>
          <a-cascader
            v-model:value="value"
            :options="options"
            placeholder="Please select"
            @change="onChange"
          />
        </a-form-item>
        <a-form-item ref="name" label="详细地址" name="details" required>
          <a-input />
        </a-form-item>
      </a-form>
    </a-modal>
  </a-layout>
</template>

<script>
// 引入请求方法 httpGet
import { httpGet } from "@/utils/http";

// 引入请求路径
import { order } from "@/api";
// 引入菜单小图标
import { EditOutlined, EnvironmentOutlined } from "@ant-design/icons-vue";
export default {
  data() {
    return {
      // 分页
      pagination: {
        // 每页显示多少数据
        pagesize: 10,
        // 第几页
        pagenum: 1,
        // 数据总数
        total: 0,
        // 指定每页可以显示多少条
        pageSizeOptions: ["1", "2", "5", "10"],
      },
      // 表格数据
      table: {
        Cols: [
          { title: "#", key: "index", slots: { customRender: "index" } },
          { title: "订单编号", dataIndex: "order_number" },
          { title: "订单价格", dataIndex: "order_price" },
          {
            title: "是否付款",
            key: "pay_status",
            slots: { customRender: "pay_status" },
          },
          { title: "是否发货", dataIndex: "is_send" },
          { title: "下单时间", dataIndex: "create_time" },
          {
            title: "操作",
            key: "operation",
            slots: { customRender: "operation" },
          },
        ],
        Data: [],
      },
      // address
      address: {
        visible: false,
        FormModel: {},
        FormRules: {},
      },
    };
  },
  created() {
    this.handleReadOrders();
  },
  methods: {
    handleReadOrders() {
      httpGet(order.GetOrders, {
        pagenum: this.pagination.pagenum,
        pagesize: this.pagination.pagesize,
      })
        .then((res) => {
          // console.log(res);
          let { meta, data } = res;
          if (meta.status == 200) {
            this.pagination.pagenum = Number(data.pagenum);
            this.pagination.total = data.total;
            this.table.Data = data.goods;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handlePageChange(page, pageSize) {
      this.pagination.pagenum = page;
      this.pagination.pagesize = pageSize;
      this.handleReadOrders();
    },
    onShowSizeChange(current, pageSize) {
      this.pagination.pagenum = current;
      this.pagination.pagesize = pageSize;
      this.handleReadOrders();
    },
    handleReadAddress(){
      this.address.visible=true
    }
  },
  components: {
    EnvironmentOutlined,
    EditOutlined,
  },
};
</script>

<style>
.ant-green {
  background-color: #67c23a;
  color: #fff;
}

.ant-green:hover,
.ant-green:focus {
  background-color: #67c23a;
  color: #fff;
  border-color: transparent;
}
</style>
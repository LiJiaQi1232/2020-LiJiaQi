<template>
  <a-layout>
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>
        <router-link to="/home" style="font-weight: bold; color: #000"
          >首页</router-link
        >
      </a-breadcrumb-item>
      <a-breadcrumb-item> 用户管理 </a-breadcrumb-item>
      <a-breadcrumb-item>用户列表</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
      <a-form>
        <a-row>
          <a-col :span="12">
            <a-row :gutter="16">
              <a-col class="gutter-row" :span="16">
                <a-form-item :wrapperCol="{ span: 24 }">
                  <a-input-search placeholder="请输入内容" size="large" />
                </a-form-item>
              </a-col>
              <a-col class="gutter-row" :span="8">
                <a-button type="primary" size="large" @click="showModal">
                  添加用户
                </a-button>
                <!-- 对话框 -->
                <a-modal
                  title="添加用户"
                  v-model:visible="visible"
                  :confirm-loading="confirmLoading"
                  cancelText="取消"
                  okText="确定"
                >
                  <a-form>
                    <a-row>
                      <a-col :span="24">
                        <!-- 用户名 -->
                        <a-form-item
                          required
                          has-feedback
                          label="用户名"
                          name="username"
                          :labelCol="{ span: 4 }"
                          :wrapperCol="{ span: 20 }"
                        >
                          <a-input type="text" />
                        </a-form-item>
                        <!-- 密码 -->

                        <a-form-item
                          required
                          has-feedback
                          label="密码"
                          name="password"
                          :labelCol="{ span: 4 }"
                          :wrapperCol="{ span: 20 }"
                        >
                          <a-input-password type="password" />
                        </a-form-item>
                        <!-- 邮箱 -->
                        <a-form-item
                          required
                          has-feedback
                          label="邮箱"
                          name="email"
                          :labelCol="{ span: 4 }"
                          :wrapperCol="{ span: 20 }"
                        >
                          <a-input type="text" />
                        </a-form-item>
                        <!-- 手机号 -->
                        <a-form-item
                          required
                          has-feedback
                          label="手机号"
                          name="mobile"
                          :labelCol="{ span: 4 }"
                          :wrapperCol="{ span: 20 }"
                        >
                          <a-input type="text" />
                        </a-form-item>
                      </a-col>
                    </a-row>
                  </a-form>
                </a-modal>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </a-form>
      <!-- 表格 -->
      <a-table
        :columns="tableColumns"
        :data-source="tableData"
        :row-key="record => record.id"
        :pagination="false"
      >
        <template #mg_state="{ text }">
          <a-switch :checked="text.mg_state" />
        </template>
        <!-- 操作 -->
        <template #operation>
          <a-button type="primary"> <EditOutlined /> </a-button>
          <a-button type="danger" style="margin: 0 10px">
            <DeleteOutlined />
          </a-button>
          <a-button><SettingOutlined /> </a-button>
        </template>
      </a-table>
      <!-- 分页 -->
      <a-pagination
        v-model:current="current"
        :total="total"
        style="margin-top: 25px"
        :show-total="total => `共 ${total} 条`"
        show-size-changer
        @showSizeChange="onShowSizeChange"
        :page-size-options="pageSizeOptions"
        :defaultPageSize="2"
        @change="handlePageChange"
        show-quick-jumper
      />
    </div>
  </a-layout>
</template>

<script>
// 引入httpGet方法
import { httpGet } from "@/utils/http";
// 引入接口
import { user } from "@/api";
// 引入图标
// 编辑: EditOutlined
// 删除: DeleteOutlined
// 设置: SettingOutlined
import {
  EditOutlined,
  DeleteOutlined,
  SettingOutlined
} from "@ant-design/icons-vue";
export default {
  created() {
    this.getUsers();
  },
  data() {
    return {
      // 模态框
      visible: false,
      confirmLoading: false,
      // 表格
      tableColumns: [
        { title: "#", dataIndex: "index", key: "index" },
        { title: "姓名", dataIndex: "username", key: "username" },
        { title: "邮箱", dataIndex: "email", key: "email" },
        { title: "电话", dataIndex: "mobile", key: "mobile" },
        { title: "角色", dataIndex: "role_name", key: "role_name" },
        { title: "状态", key: "mg_state", slots: { customRender: "mg_state" } },
        {
          title: "操作",
          key: "operation",
          slots: { customRender: "operation" }
        }
      ],
      tableData: [],
      //分页
      current: 1,
      total: 0,
      pageSizeOptions: ["1", "2", "5", "10"]
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    // 获取数据
    getUsers(pagenum = 1, pagesize = 2) {
      httpGet(user.GetUsers, {
        pagenum: pagenum,
        pagesize: pagesize
      })
        .then(response => {
          // console.log(response);
          let { data, meta } = response;
          if (meta.status == 200) {
            // 将data中的数据给tableData
            this.tableData = data.users;
            // 当前页码
            this.current = data.pagenum;
            // 总条数
            this.total = data.total;
            this.tableData.forEach((ele, index) => {
              ele.index = index + 1;
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 可以改变 pageSize
    onShowSizeChange(current, pageSize) {
      this.getUsers(current, pageSize);
    },
    handlePageChange(page, pageSize) {
      this.getUsers(page, pageSize);
    }
  },
  components: {
    EditOutlined,
    DeleteOutlined,
    SettingOutlined
  }
};
</script>

<style></style>

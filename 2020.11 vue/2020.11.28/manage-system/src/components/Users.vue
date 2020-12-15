<template>
  <a-layout>
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item
        ><router-link to="/home" style="font-weight: bold; color: #000"
          >首页</router-link
        ></a-breadcrumb-item
      >
      <a-breadcrumb-item>用户管理</a-breadcrumb-item>
      <a-breadcrumb-item>用户列表</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
      <!-- 添加用户 -->
      <a-form>
        <a-row>
          <a-col :span="12">
            <a-row :gutter="16">
              <a-col class="gutter-row" :span="16">
                <a-form-item :wrapperCol="{ span: 24 }">
                  <a-input-search size="large" placeholder="请输入内容" />
                </a-form-item>
              </a-col>
              <a-col class="gutter-row" :span="8">
                <a-button type="primary" size="large" @click="addUserModal">
                  添加用户
                </a-button>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </a-form>
      <!-- 表格 -->
      <a-table
        :row-key="(record) => record.id"
        :columns="tableColumns"
        :data-source="tableData"
        :pagination="false"
        bordered
      >
        <template #mg_state="{ text }">
          <a-switch v-model:checked="text.mg_state" :id="text.id" @change="handleUserState"/>
        </template>

        <template #operation="{ record }">
          <!-- 编辑 -->
          <a-button type="primary" @click="handleReadUser(record.id)">
            <EditOutlined />
          </a-button>
          <!-- 删除 -->
          <a-button
            type="danger"
            style="margin: 0 10px"
            @click="handleDeleteUser(record.id)"
          >
            <DeleteOutlined
          /></a-button>
          <!-- 角色 -->
          <a-button
            type="default"
            style="background-color: #e6a23c; color: #fff"
            @click="handleReadRole(record)"
          >
            <SettingOutlined
          /></a-button>
        </template>
      </a-table>
      <!-- 分页 -->
      <a-pagination
        style="margin-top: 25px"
        v-model:current="current"
        :total="total"
        :show-total="(total) => `共 ${total} 条`"
        show-size-changer
        @showSizeChange="onShowSizeChange"
        :page-size-options="pageSizeOptions"
        :defaultPageSize="2"
        @change="handlePageChange"
        show-quick-jumper
      />
    </div>
    <!-- 添加用户 -->
    <a-modal
      title="添加用户"
      cancelText="取消"
      okText="确定"
      v-model:visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleAddUsers"
      @cancel="cancelAddUsers"
    >
      <a-form ref="addUserRef" :model="addUserModel" :rules="addUserRules">
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
              <a-input type="text" v-model:value="addUserModel.username" />
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
              <a-input-password
                type="password"
                v-model:value="addUserModel.password"
              />
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
              <a-input type="text" v-model:value="addUserModel.email" />
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
              <a-input type="text" v-model:value="addUserModel.mobile" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
    <!-- 编辑用户 -->
    <a-modal
      title="编辑用户"
      cancelText="取消"
      okText="确定"
      v-model:visible="editVisible"
      :confirm-loading="confirmLoading"
      @ok="handleEditUsers"
      @cancel="cancelEditUsers"
    >
      <a-form ref="editUserRef" :model="editUserModel" :rules="editUserRules">
        <a-row>
          <a-col :span="24">
            <!-- 用户名 -->
            <a-form-item
              has-feedback
              label="用户名"
              name="username"
              :labelCol="{ span: 4 }"
              :wrapperCol="{ span: 20 }"
            >
              <a-input type="text" v-model:value="editUserModel.username" />
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
              <a-input type="text" v-model:value="editUserModel.email" />
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
              <a-input type="text" v-model:value="editUserModel.mobile" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
    <!-- 分配角色 -->
    <a-modal
      title="分配角色"
      v-model:visible="roleVisible"
      @ok="handleEditRole"
    >
      <p>当前的用户:{{ userInfo.username }}</p>
      <p>当前的角色:{{ userInfo.role_name }}</p>
      <p>
        分配新角色
        <a-select v-model:value="roleSelected" style="width: 120px">
          <a-select-option
            :value="item.id"
            v-for="item in roleList"
            :key="item.id"
          >
            {{ item.roleName }}
          </a-select-option>
        </a-select>
      </p>
    </a-modal>
  </a-layout>
</template>

<script>
// 引入请求方法 httpGet
import { httpGet, httpPost, httpDelete, httpPut } from "@/utils/http";

// 引入请求路径
import { user, role } from "@/api";
// 引入小图标
// 引入菜单小图标
import {
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { createVNode } from "vue";
import { Modal } from "ant-design-vue";
export default {
  created() {
    // 调用获取用户数据的方法
    this.getUsers();
  },
  data() {
    // 自定义表单验证 ----邮箱
    let checkEmail = async (rule, value) => {
      if (value == "") {
        return Promise.reject("请输入您的邮箱");
      } else if (
        !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)
      ) {
        return Promise.reject("您的邮箱格式错误");
      } else {
        return Promise.resolve();
      }
    };
    // 自定义表单验证 ----手机号
    let checkMobile = async (rule, value) => {
      if (value == "") {
        return Promise.reject("请输入您的手机号");
      } else if (!/^[1]([3-9])[0-9]{9}$/.test(value)) {
        return Promise.reject("您的手机号格式错误");
      } else {
        return Promise.resolve();
      }
    };
    return {
      // 表格列配置
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
          slots: { customRender: "operation" },
        },
      ],
      // 表格数据
      tableData: [],
      // 分页
      current: 1,
      total: 0,
      // 指定每页可以显示多少条
      pageSizeOptions: ["1", "2", "5", "10"],

      // 添加用户弹出框
      visible: false,
      confirmLoading: false,
      addUserModel: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      addUserRules: {
        username: [
          // required 必须的
          // trigger 啥时候触发
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 4, max: 16, message: "长度在4-16个字符之间", trigger: "blur" },
        ],
        password: [
          // required 必须的
          // trigger 啥时候触发
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在6-16个字符之间", trigger: "blur" },
        ],
        email: [{ validator: checkEmail, trigger: "change" }],
        mobile: [{ validator: checkMobile, trigger: "change" }],
      },
      // 编辑用户
      editVisible: false,
      editUserModel: {},
      editUserRules: {
        email: [{ validator: checkEmail, trigger: "change" }],
        mobile: [{ validator: checkMobile, trigger: "change" }],
      },
      // 分配角色
      roleVisible: false,
      userInfo: {},
      roleSelected: null,
      roleList: [],
    };
  },
  methods: {
    // 获取用户数据
    getUsers(pagenum = 1, pagesize = 2) {
      httpGet(user.GetUsers, {
        pagenum: pagenum,
        pagesize: pagesize,
      })
        .then((response) => {
          // console.log(response);
          let { meta, data } = response;
          // 如果后台返回的状态码为200,则代表请求成
          if (meta.status == 200) {
            // 设置表格数据
            this.tableData = data.users;
            // 设置当前页码
            this.current = data.pagenum;
            // 设置数据总数
            this.total = data.total;
            // 给每条数据添加序号(index)属性
            this.tableData.forEach((ele, index) => {
              ele.index = index + 1;
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 根据每页显示多少条数据不同 重新渲染表格
    onShowSizeChange(current, pageSize) {
      // console.log(current, pageSize);
      this.getUsers(current, pageSize);
    },
    // 页码改变的回调，参数是改变后的页码及每页条数
    handlePageChange(page, pageSize) {
      this.getUsers(page, pageSize);
    },
    // 显示模态框
    addUserModal() {
      this.visible = true;
    },
    // 添加用户
    handleAddUsers() {
      this.$refs.addUserRef
        .validate()
        .then(() => {
          // 整理参数
          let params = {
            username: this.addUserModel.username,
            password: this.addUserModel.password,
            email: this.addUserModel.email,
            mobile: this.addUserModel.mobile,
          };
          httpPost(user.AddUsers, params)
            .then((res) => {
              // console.log(res);
              let { meta } = res;
              if (meta.status == 201) {
                // 让模态框消失
                this.visible = false;
                // 清空输入框的内容
                this.$refs.addUserRef.resetFields();
                this.getUsers();
                message.success(meta.msg);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
      // AddUsers
    },
    // 取消添加用户
    cancelAddUsers() {
      // 让模态框消失
      this.visible = false;
      // 清空输入框的内容
      this.$refs.addUserRef.resetFields();
    },
    // 删除用户
    handleDeleteUser(userId) {
      let _this = this;
      Modal.confirm({
        title: "提示",
        icon: createVNode(ExclamationCircleOutlined),
        content: "此操作将永久删除该用户，是否继续？",
        cancelText: "取消",
        okText: "确定",
        onOk() {
          httpDelete(user.DeleteUser + `/${userId}`)
            .then((res) => {
              let { meta } = res;
              if (meta.status == 200) {
                _this.getUsers();
                message.success(meta.msg);
              } else if (meta.status == 400) {
                message.error(meta.msg);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        },
        onCancel() {
          message.warning("已取消删除！！");
        },
        class: "test",
      });
    },
    // 回显用户信息
    handleReadUser(userId) {
      // 让模态框显示
      this.editVisible = true;
      // 发送请求
      httpGet(user.GetUsers + `/${userId}`)
        .then((res) => {
          let { meta, data } = res;
          if (meta.status == 200) {
            this.editUserModel = data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 编辑用户
    handleEditUsers() {
      this.$refs.editUserRef
        .validate()
        .then(() => {
          // console.log(res);
          // 发送请求
          httpPut(
            user.UpdateUser + `/${this.editUserModel.id}`,
            this.editUserModel
          )
            .then((res) => {
              let { meta } = res;
              if (meta.status == 200) {
                // 让模态框消失
                this.editVisible = false;
                // 更新数据
                this.getUsers();
                message.success(meta.msg);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 取消编辑用户
    cancelEditUsers() {
      // 模态框消失
      this.editVisible = false;
    },
    // 回显角色信息
    handleReadRole(user) {
      // 让模态框显示
      this.roleVisible = true;
      this.userInfo = user;
      // 发送请求 获取角色列表
      httpGet(role.GetRoles)
        .then((res) => {
          console.log(res);
          let { meta, data } = res;
          if (meta.status == 200) {
            this.roleList = data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 分配新角色
    handleEditRole() {
      // 获取角色id
      let rid = this.roleSelected;
      if (rid == null) {
        message.error("请选择一个角色！！！");
        return;
      }
      httpPut(`users/${this.userInfo.id}/role`, { rid: this.roleSelected })
        .then((res) => {
          // console.log(res);
          let { meta } = res;
          if (meta.status == 200) {
            message.success(meta.msg);
            this.getUsers();
            this.roleVisible = false;
            this.roleSelected = null;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 更改用户状态
    handleUserState(checked, event) {
      httpPut(`users/${event.target.id}/state/${checked}`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: {
    EditOutlined,
    DeleteOutlined,
    SettingOutlined,
  },
};
</script>

<style></style>

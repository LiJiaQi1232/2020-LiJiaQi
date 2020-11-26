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
          <a-switch
            v-model:checked="text.mg_state"
            :id="text.id"
            @change="handleUserState"
          />
        </template>

        <template #operation="{ record }">
          <!-- 编辑 -->
          <a-button type="primary" @click="handleReaderUser(record.id)">
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
            @click="handleReaderRole(record)"
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
    <!-- 添加 -->
    <a-modal
      title="添加用户"
      cancelText="取消"
      okText="确定"
      v-model:visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleAddUser"
      @cancel="cancelAddUser"
    >
      <a-form :model="addFormModel" :rules="addFormRules" ref="adddFormRef">
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
              <a-input type="text" v-model:value="addFormModel.username" />
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
                v-model:value="addFormModel.password"
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
              <a-input type="text" v-model:value="addFormModel.email" />
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
              <a-input type="text" v-model:value="addFormModel.mobile" />
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
      @ok="handleEditUser"
      @cancel="cancelEditAddUser"
    >
      <a-form :model="editFormModel" :rules="editFormRules" ref="editdFormRef">
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
              <a-input type="text" v-model:value="editFormModel.username" />
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
              <a-input type="text" v-model:value="editFormModel.email" />
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
              <a-input type="text" v-model:value="editFormModel.mobile" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
    <!-- 角色修改 -->
    <a-modal
      title="分配角色"
      v-model:visible="roleVisible"
      @ok="handleEditRole"
    >
      <p>当前的用户：{{ userInfo.username }}</p>
      <p>当前的角色：{{ userInfo.role_name }}</p>
      <p>
        分配新角色：
        <a-select
          v-model:value="roleSelected"
          @change="handleSelectedValue"
          style="width: 120px"
          placeholder="请选择"
        >
          <a-select-option
            v-for="item in roleList"
            :key="item.id"
            :value="item.id"
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
// 引入httpPost方法
import { httpGet, httpPost, httpDelete, httpPut } from "@/utils/http";
// 引入请求路径
import { user, role } from "@/api";
// 引入全局消息提示框
import { message, Modal } from "ant-design-vue";
// 引入一个虚拟dom
import { createVNode } from "vue";
// 引入小图标
import {
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";

export default {
  created() {
    // 调用获取用户数据的方法
    this.getUsers();
  },
  data() {
    // 自定义表单校验----邮箱
    let checkEmail = async (rule, value) => {
      // 如果没有输入 则提示请输入您的邮箱
      if (value === "") {
        return Promise.reject("请输入您的邮箱");
      }
      // 如果邮箱格式错误 那么提示 格式错误
      else if (
        !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)
      ) {
        return Promise.reject("您的邮箱格式错误");
      } else {
        return Promise.resolve();
      }
    };
    // 自定义表单校验----手机号
    let checkMobile = async (rule, value) => {
      // 如果没有输入 则提示请输入您的手机号
      if (value === "") {
        return Promise.reject("请输入您的手机号");
      }
      // 如果手机号格式错误 那么提示 格式错误
      else if (!/^[1]([3-9])[0-9]{9}$/.test(value)) {
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
      pagesize: 2,
      // 指定每页可以显示多少条
      pageSizeOptions: ["1", "2", "5", "10"],

      // 添加用户弹出框
      visible: false,
      confirmLoading: false,
      // 表单模型对象
      addFormModel: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      // 表单校验规则
      addFormRules: {
        // 给那个字段添加什么规则
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
      // 编辑表单弹出框
      editVisible: false,
      // 编辑表单模型
      editFormModel: {},
      // 编辑表单校验规则
      editFormRules: {
        email: [{ validator: checkEmail, trigger: "change" }],
        mobile: [{ validator: checkMobile, trigger: "change" }],
      },
      // 角色修改
      roleVisible: false,
      userInfo: {},
      roleList: [],
      roleSelected: null,
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
    handleAddUser() {
      this.$refs.adddFormRef
        .validate()
        .then(() => {
          // 整理参数
          let params = {
            username: this.addFormModel.username,
            password: this.addFormModel.password,
            email: this.addFormModel.email,
            mobile: this.addFormModel.mobile,
          };
          httpPost(user.AddUser, params)
            .then((response) => {
              // console.log(response);
              let { meta } = response;
              // 让模态框消失
              this.visible = false;
              //  清空输入框
              this.$refs.adddFormRef.resetFields();
              // 全局消息提示框 创建成功
              message.success(meta.msg);
              // 停留在哪个页面上 添加数据 添加成功后 还在这个页面上
              let pagenum = this.current;
              let pagesize = this.pagesize;
              this.getUsers(pagenum, pagesize);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 取消添加用户
    cancelAddUser() {
      //  清空输入框
      this.$refs.adddFormRef.resetFields();
    },
    // 删除一个用户
    handleDeleteUser(userId) {
      let _this = this;
      // 信息提示框
      Modal.confirm({
        title: "提示",
        icon: createVNode(ExclamationCircleOutlined),
        content: "此操作将永久删除该用户，是否继续？",
        okText: "确定",
        cancelText: "取消",
        onOk() {
          httpDelete(user.DeleteUser + `/${userId}`)
            .then((response) => {
              let { meta } = response;
              if (meta.status == 400) {
                message.error(meta.msg);
              }
              if (meta.status == 200) {
                _this.getUsers();
                message.success(meta.msg);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        },
        onCancel() {
          message.warning("已取消删除");
        },
      });
    },
    // 回显数据
    handleReaderUser(userId) {
      // 让模态框显示
      this.editVisible = true;
      // 发送请求
      httpGet(user.getUser + `/${userId}`)
        .then((response) => {
          let { meta, data } = response;
          if (meta.status == 200) {
            this.editFormModel = data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 更新用户信息
    handleEditUser() {
      this.$refs.editdFormRef
        .validate()
        .then(() => {
          httpPut(
            user.UpdateUser + `/${this.editFormModel.id}`,
            this.editFormModel
          )
            .then((response) => {
              // console.log(response);
              let { meta } = response;
              if (meta.status == 200) {
                message.success(meta.msg);
                // 让模态框消失
                this.editVisible = false;
                // 刷新表格数据
                this.getUsers();
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
    // 取消编辑
    cancelEditAddUser() {
      // 让模态框消失
      this.editVisible = false;
    },
    //回显角色信息
    handleReaderRole(user) {
      // 让模态框显示
      this.roleVisible = true;
      this.userInfo = user;
      // 发送请求 获取角色列表
      httpGet(role.GetRoles)
        .then((response) => {
          // console.log(response);
          let { meta, data } = response;
          if (meta.status == 200) {
            // 将角色列表给roleList
            this.roleList = data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取下拉菜单的值
    handleSelectedValue(value) {
      console.log(value);
    },
    // 修改用户角色
    handleEditRole() {
      // 获取选择到的角色id
      let rid = this.roleSelected;
      // 如果用户没有选择 给用户一个提示但不发送请求
      if (rid == null) {
        message.error("请选择一个角色！！");
        return;
      }
      // 如果用户选择了 就发请求  修改角色
      httpPut(`users/${this.userInfo.id}/role`, { rid: this.roleSelected })
        .then((response) => {
          // console.log(response);
          let { meta } = response;
          if (meta.status == 400) {
            message.error(meta.msg);
          }
          if (meta.status == 200) {
            //  提示用户登录成功
            message.success(meta.msg);
            // 重新渲染表格
            this.getUsers();
            // 重置选项
            this.roleSelected = null;
            // 模态框消失
            this.roleVisible = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 更改用户状态
    handleUserState(checked, event) {
      httpPut(`users/${event.target.id}/state/${checked}`)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));
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

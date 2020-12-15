<template>
  <a-layout>
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item
        ><router-link to="/home" style="font-weight: bold; color: #000"
          >首页</router-link
        ></a-breadcrumb-item
      >
      <a-breadcrumb-item>权限管理</a-breadcrumb-item>
      <a-breadcrumb-item>角色列表</a-breadcrumb-item>
    </a-breadcrumb>
    <!-- 内容start -->
    <a-card>
      <!-- 添加角色按钮 -->
      <a-row>
        <a-col>
          <a-button
            type="primary"
            style="margin-bottom: 24px"
            @click="addRoleModal"
          >
            添加角色
          </a-button>
        </a-col>
      </a-row>
      <!-- 表格 -->
      <a-table
        :row-key="(record) => record.id"
        :columns="rolesColumns"
        :data-source="rolesData"
        :pagination="false"
        bordered
        childrenColumnName="abc"
      >
        <!-- 序号 -->
        <template #index="{ index }">
          {{ index + 1 }}
        </template>
        <!-- 可展开 -->
        <template #expandedRowRender="{ record }">
          <!-- 一级渲染 -->
          <a-row
            v-for="(item1, index1) in record.children"
            :key="item1.id"
            :class="['bdbottom vcenter', index1 == 0 ? 'bdtop' : '']"
          >
            <a-col :span="5">
              <span>
                <a-tag color="blue"> {{ item1.authName }} </a-tag>
                <CaretRightOutlined />
              </span>
            </a-col>
            <a-col :span="19">
              <!-- 二级渲染 -->
              <a-row
                :class="['bdbottom vcenter']"
                v-for="item2 in item1.children"
                :key="item2.id"
              >
                <a-col :span="6">
                  <span>
                    <a-tag color="green"> {{ item2.authName }} </a-tag>
                    <CaretRightOutlined />
                  </span>
                </a-col>
                <a-col :span="18">
                  <span>
                    <a-tag
                      color="orange"
                      v-for="item3 in item2.children"
                      :key="item3.id"
                    >
                      {{ item3.authName }}
                    </a-tag>
                  </span>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </template>
        <!-- 操作 -->
        <template #operation>
          <!-- 编辑 -->
          <a-button size="small" type="primary">
            <EditOutlined />编辑
          </a-button>
          <!-- 删除 -->
          <a-button size="small" type="danger" style="margin: 0 10px">
            <DeleteOutlined />删除</a-button
          >
          <!-- 权限 -->
          <a-button
            size="small"
            type="default"
            style="background-color: #e6a23c; color: #fff"
          >
            <SettingOutlined />分配权限</a-button
          >
        </template>
      </a-table>
    </a-card>
    <!-- 内容end -->
    <!-- 添加角色 -->
    <a-modal
      title="添加角色"
      cancelText="取消"
      okText="确定"
      v-model:visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleAddRole"
      @cancel="cancelAddRole"
    >
      <a-form ref="roleFormRef" :model="addRoleModel" :rules="RoleRules">
        <a-row>
          <a-col :span="24">
            <!-- 角色名称 -->
            <a-form-item
              required
              has-feedback
              label="角色名称"
              name="roleName"
              :labelCol="{ span: 4 }"
              :wrapperCol="{ span: 20 }"
            >
              <a-input type="text" v-model:value="addRoleModel.roleName" />
            </a-form-item>
            <!-- 角色描述 -->
            <a-form-item
              has-feedback
              label="角色描述"
              name="roleDesc"
              :labelCol="{ span: 4 }"
              :wrapperCol="{ span: 20 }"
            >
              <a-input type="text" v-model:value="addRoleModel.roleDesc" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </a-layout>
</template>

<script>
// 引入请求方法 httpGet
import { httpGet, httpPost } from "@/utils/http";
// 引入请求路径
import { role } from "@/api";
// 引入小图标
import {
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
  CaretRightOutlined,
} from "@ant-design/icons-vue";
import { message } from 'ant-design-vue';
export default {
  created() {
    this.getRoleList();
  },
  data() {
    return {
      rolesColumns: [
        { title: "#", key: "index", slots: { customRender: "index" } },
        { title: "角色名称", dataIndex: "roleName" },
        { title: "角色描述", dataIndex: "roleDesc" },
        {
          title: "操作",
          key: "operation",
          slots: { customRender: "operation" },
        },
      ],
      rolesData: [],
      // 添加角色
      visible: false,
      confirmLoading: false,
      // 添加角色模型对象
      addRoleModel: {
        roleName: "",
        roleDesc: "",
      },
      // 添加角色规则
      RoleRules: {
        // 给那个字段添加什么规则
        roleName: [
          // required 必须的
          // trigger 啥时候触发
          { required: true, message: "请输入角色名称", trigger: "change" },
          {
            min: 4,
            max: 16,
            message: "长度在4-16个字符之间",
            trigger: "change",
          },
        ],
        roleDesc: [
          // required 必须的
          // trigger 啥时候触发
          { required: false, message: "请输入角色描述", trigger: "change" },
          {
            min: 6,
            max: 16,
            message: "长度在6-16个字符之间",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    // 获取角色列表
    getRoleList() {
      httpGet(role.GetRoles)
        .then((res) => {
          let { meta, data } = res;
          if (meta.status == 200) {
            this.rolesData = data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 添加角色 显示模态框
    addRoleModal() {
      this.visible = true;
    },
    // 添加角色
    handleAddRole() {
      this.$refs.roleFormRef
        .validate()
        .then(() => {
          // 整理参数
          let params = {
            roleName: this.addRoleModel.roleName,
            roleDesc: this.addRoleModel.roleDesc,
          };
          // 发送请求
          httpPost(role.AddRoles, params)
            .then((res) => {
              let { meta } = res;
              if (meta.status == 201) {
                // 让模态框消失
                this.visible = false;
                // 清空输入框
                this.$refs.roleFormRef.resetFields();
                // 更新
                message.success(meta.msg)
                this.getRoleList()
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
    // 取消添加角色
    cancelAddRole() {
      // 清空输入框
      this.$refs.roleFormRef.resetFields();
    },
  },
  components: {
    EditOutlined,
    DeleteOutlined,
    SettingOutlined,
    CaretRightOutlined,
  },
};
</script>

<style>
.ant-tag {
  padding: 2px 14px;
  font-size: 14px;
}

.ant-tag {
  margin: 7px;
}

.bdtop {
  border-top: 1px solid #eee;
}

.bdbottom {
  border-bottom: 1px solid #eee;
}

.vcenter {
  display: flex;
  align-items: center;
}
</style>
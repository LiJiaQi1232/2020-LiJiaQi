# day28

## 角色修改

A.添加分配角色对话框
B.给分配角色按钮添加点击事件，点击之后弹出一个对话框进行角色分配
C.在ant design vue中引入Select，Option，注册Select，Option
D.当用户点击对话框中的确定之后，完成分配角色的操作

## 用户状态更改

1.把以前的:checked="text.mg_state"改成v-model:checked="text.mg_state"
2.a-switch组件给我们提供了change事件,给我们返回 开关状态 事件对象
3.在组件上添加一个id属性
4.在change事件的回调函数中获取a-switch状态 获取id值(event.target.id)
5.发起ajax请求 就可以了

// 关于用户的接口
export const user = {
  LoginUser: "login", // 用户登录
  GetUsers: "users", // 获取所有用户
  AddUsers: "users", //添加一个用户
  DeleteUser: "users",//删除一个用户
  UpdateUser:"users" //编辑更新用户
  
};

// 关于权限的接口
export const rights = {
  AsideMenus: "menus", // 获取左侧菜单权限
  GetRights:'rights/list' //获取权限列表
};
// 关于角色的接口
export const role = {
  GetRoles: "roles",//获取角色列表
  AddRoles:"roles" //添加角色
}

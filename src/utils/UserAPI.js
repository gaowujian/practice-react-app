// 模拟后端接口服务，使用localstorage的users作为数据库存储
const UserAPI = {
  list: function () {
    const users = localStorage.getItem("users");
    if (!users) {
      return [];
    }
    return JSON.parse(users);
  },
  add: function (user) {
    const users = this.list();
    users.push({ ...user, id: Date.now().toString() });
    localStorage.setItem("users", JSON.stringify(users));
  },
  find: function (id) {
    const users = this.list();
    return users.find((user) => user.id === id);
  },
  login: function (user) {
    const users = this.list();
    const userObj = users.find((userItem) => {
      return (
        userItem.username === user.username &&
        userItem.password === user.password
      );
    });
    if (!userObj) return { status: "fail", msg: "用户不存在" };
    return {
      status: "success",
      msg: "登陆成功",
      user: {
        id: userObj.id,
      },
    };
  },
  // 后台接口提供login状态
  checkLogin(id) {},
};
export default UserAPI;

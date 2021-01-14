import React from "react";
import UserAPI from "../utils/UserAPI";

// 由于该组件是被保护的，经过校验成功之后，信息会存储在localStorage中
// 获取信息也去localStorage拿

// 该组件是一个业务组件，不应该参与权限的校验问题，不存在渲染无权访问这些内容的情况
// 只负责根据props进行渲染, 既然我是校验过后渲染，那我就要假设，数据全部正确
function UserDetail(props) {
  // const { user } = props;
  console.log(props);
  const id = props.match.params.id;
  const userInfo = UserAPI.find(id);
  return (
    <div>
      <h1>用户详情页面</h1>
      当前用户信息:{userInfo && userInfo.username}
    </div>
  );
}

export default UserDetail;

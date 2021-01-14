import React from "react";

import { Redirect, Route, Switch, NavLink } from "react-router-dom";
import Protected from "../components/Protected";
import AnotherProtected from "../components/AnotherProtected";
import UserAdd from "../components/UserAdd";
import UserDetail from "../components/UserDetail";
import UserList from "../components/UserList";

function User() {
  // 这块逻辑其真正发挥作用的时候，实是在第一次登陆之后，关闭网页，第二次登陆实现了持久化
  const login = JSON.parse(localStorage.getItem("login"));
  let id = "";
  if (login && login.status === "success") {
    id = login.user.id;
  }
  return (
    <div className="user-container">
      <aside className="user-container_side-bar">
        <ul>
          <li>
            <NavLink activeClassName="active-sub" exact to="/user/list">
              用户列表
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active-sub" exact to="/user/add">
              添加用户
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName="active-sub"
              exact
              to={`/user/detail/${id}`}
            >
              用户详情
            </NavLink>
          </li>
        </ul>
      </aside>
      <div className="user-container_content">
        <Switch>
          <Route path="/user/list" component={UserList} />
          <Route path="/user/add" component={UserAdd} />
          <AnotherProtected path="/user/detail/:id" component={UserDetail} />
          <Redirect to="/user/list" />
        </Switch>
      </div>
    </div>
  );
}

export default User;

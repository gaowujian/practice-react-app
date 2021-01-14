import React, { useState } from "react";
import UserAPI from "../utils/UserAPI";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (username && password) {
      const result = UserAPI.login({ username, password });
      if (result.status === "fail") {
        return alert(result.msg);
      }
      console.log("登陆成功:跳转到用户详情页面");
      // 前端维护了login的状态，用于之后查询。正常来说是后端接口提供
      localStorage.setItem("login", JSON.stringify(result));
      props.history.push({
        pathname: `/user/detail/${result.user.id}`,
        state: result.user,
      });
    }
  }
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="form-control">
        <label htmlFor="username">username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          autoComplete="true"
        />
      </div>
      <div className="form-control">
        <label htmlFor="password">password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          autoComplete="true"
        />
      </div>
      <button className="submit-btn">登陆</button>
    </form>
  );
}

export default Login;

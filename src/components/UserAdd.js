import React, { useState } from "react";
import UserAPI from "../utils/UserAPI";

function UserAdd(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (username && password) {
      const user = {
        username,
        password,
      };
      UserAPI.add(user);
      props.history.push("/user/list");
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
      <button className="submit-btn">添加用户</button>
    </form>
  );
}

export default UserAdd;

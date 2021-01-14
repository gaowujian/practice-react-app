import React from "react";
import { Redirect, Route } from "react-router-dom";
function withPermission(RouteComponent) {
  return function (props) {
    return (
      <Route
        {...props}
        render={(routeProps) => {
          // 受保护路由的校验逻辑,正常应该使用后端的接口校验，而不是前端的localStorage校验
          // 应该用 UserAPI中的checkLogin

          const login = JSON.parse(localStorage.getItem("login"));
          if (login && login.status === "success" && login.user) {
            return <RouteComponent {...routeProps} user={login.user} />;
          }
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: routeProps.location },
              }}
            />
          );
        }}
      />
    );
  };
}

export default withPermission;

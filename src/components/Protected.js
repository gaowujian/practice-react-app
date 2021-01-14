import React from "react";
import { Redirect, Route } from "react-router-dom";

// 高阶组件hoc和render props 都是函数
// 高阶组件比较容易理解，使用的是AOP的思想，在外层和被包裹的组件之前做了一些额外的事
// NewComp = hoc(OldComp) 我原来有内容，你帮我包裹一层逻辑

// render props 相对更复杂一点，我自己有逻辑，你给我传入内容
// 直接把函数本身当成一个组件去使用,例如下面的Protected
// 需要渲染的东西通过props传入，下面的例子用了component属性
// 要渲染的是一个UserDetail函数组件
//  <Protected path="/user/detail/:id" component={UserDetail} />

/**
 * * Protected是一个受保护路由，本质就是一个使用render属性的Route组件
 * * 是否渲染在于校验的逻辑，不是验证location的id有没有值
 * * 也没有必要用withRouter来包裹，因为校验的时候，不是利用前端的路由信息
 * * 为什么不使用 if else来渲染 Route
 *
 * @param {*} props
 * @return {*}
 */

function Protected(props) {
  const { component: RouteComponent, ...rest } = props;

  return (
    <Route
      render={(routeProps) => {
        // 受保护路由的校验逻辑,正常应该使用后端的接口校验，而不是前端的localStorage校验
        // 应该用 UserAPI中的checkLogin

        const login = JSON.parse(localStorage.getItem("login"));
        if (login && login.status === "success" && login.user) {
          return <RouteComponent {...routeProps} {...rest} user={login.user} />;
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
}

export default Protected;

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Personal from "./pages/Personal";
import { createBrowserHistory } from "history";
import { useRef } from "react";

export default function App() {
  const routeRef = React.createRef();
  console.log("App -> routeRef", routeRef);
  const linkRef = React.createRef();
  console.log("App -> linkRef", linkRef);
  const routeDom = useRef(routeRef);
  console.log("App -> routeDom", routeDom);
  const linkDom = useRef(linkRef);
  console.log("App -> linkDom", linkDom);

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} ref={routeRef} />
        <Personal path="/category" exact />
        <Route path="/category" component={Category} />
        <Route path="/personal" component={Personal} />
      </Switch>
      <NavLink style={{ marginRight: "10px" }} to="/" ref={linkRef}>
        首页
      </NavLink>
      <NavLink
        style={{ marginRight: "10px" }}
        to="/category"
        onClick={(e) => {
          console.log(e);
        }}
      >
        分类
      </NavLink>
      <NavLink style={{ marginRight: "10px" }} to="/personal1">
        个人信息
      </NavLink>
      <NavLink
        style={{ marginRight: "10px" }}
        onClick={() => {
          console.log("难搞");
        }}
        to="/personal/login"
      >
        登陆
      </NavLink>
      <NavLink style={{ marginRight: "10px" }} to="/personal/register">
        注册
      </NavLink>
    </Router>
  );
}

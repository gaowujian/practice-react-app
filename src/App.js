import React from "react";
import Common from "./components/Common";
import Navigation from "./components/Navigation";
import DataDisplay from "./components/DataDisplay";
import Layout from "./components/Layout";
import DataInput from "./components/DataInput";
import AntdForm from "./components/AntdForm";
import Test from "./components/Test";
import { HashRouter as Router, Route, Link } from "react-router-dom";

import "./style.css";
import { Menu } from "antd";

function App() {
  return (
    <Router>
      <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 10 }}>
        <Menu mode="horizontal">
          <Menu.Item>
            <Link to="/">通用组件</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/layout">布局类组件</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/navigation">导航类组件</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/data-display">数据展示组件</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/data-input">数据输入组件</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/form">表单组件</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/test">测试功能组件</Link>
          </Menu.Item>
        </Menu>
      </div>

      <div className="container">
        <div className="demo-area">
          <Route path="/" exact component={Common} />
          <Route path="/layout" component={Layout} />
          <Route path="/navigation" component={Navigation} />
          <Route path="/data-display" component={DataDisplay} />
          <Route path="/data-input" component={DataInput} />
          <Route path="/form" component={AntdForm} />
          <Route path="/test" component={Test} />
        </div>
      </div>
    </Router>
  );
}

export default App;

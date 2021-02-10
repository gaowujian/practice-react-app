import { Menu } from "antd";
import React from "react";
import { HashRouter as Router, Link, Route } from "react-router-dom";
import AntdForm from "./components/AntdForm";
import AntdTable from "./components/AntdTable";
import Common from "./components/Common";
import DataDisplay from "./components/DataDisplay";
import DataInput from "./components/DataInput";
import Layout from "./components/Layout";
import Navigation from "./components/Navigation";
import Test from "./components/Test";
import "./style.css";

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
            <Link to="/table">表格组件</Link>
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
          <Route path="/table" component={AntdTable} />
          <Route path="/test" component={Test} />
        </div>
      </div>
    </Router>
  );
}

export default App;

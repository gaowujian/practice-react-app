import { Menu } from "antd";
import React from "react";
import { HashRouter as Router, Link, Route, Switch } from "react-router-dom";
import AntdForm from "./components/AntdForm";
import AntdTable from "./components/AntdTable";
import Common from "./components/Common";
import DataDisplay from "./components/DataDisplay";
import DataInput from "./components/DataInput";
import Layout from "./components/Layout";
import Navigation from "./components/Navigation";
import FeedBack from "./components/FeedBack";
import Test from "./components/Test";
import "./style.css";
import NotFound from "./components/NotFound";
import ProLayout from "./components/ProLayout";
import AntdPageContainer from "./components/AntdPageContainer";
import AntdProCard from "./components/AntdProCard";

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
          <Menu.Item>
            <Link to="/feedback">反馈信息组件</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/prolayout">高级布局</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/pagecontainer">页容器</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/procard">业内容器card</Link>
          </Menu.Item>
        </Menu>
      </div>

      <div className="container">
        <div className="demo-area">
          <Switch>
            <Route path="/" exact component={Common} />
            <Route path="/layout" component={Layout} />
            <Route path="/navigation" component={Navigation} />
            <Route path="/data-display" component={DataDisplay} />
            <Route path="/data-input" component={DataInput} />
            <Route path="/form" component={AntdForm} />
            <Route path="/table" component={AntdTable} />
            <Route path="/feedback" component={FeedBack} />
            <Route path="/test" component={Test} />
            <Route path="/prolayout" component={ProLayout} />
            <Route path="/pagecontainer" component={AntdPageContainer} />
            <Route path="/procard" component={AntdProCard} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

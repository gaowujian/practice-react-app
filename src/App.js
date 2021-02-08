import React from "react";
import Common from "./components/Common";
import Navigation from "./components/Navigation";
import DataDisplay from "./components/DataDisplay";
import Layout from "./components/Layout";
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
        </Menu>
      </div>

      <div className="container">
        <div className="demo-area">
          <Route path="/" exact component={Common} />
          <Route path="/layout" component={Layout} />
          <Route path="/navigation" component={Navigation} />
          <Route path="/data-display" component={DataDisplay} />
        </div>
      </div>
    </Router>
  );
}

export default App;

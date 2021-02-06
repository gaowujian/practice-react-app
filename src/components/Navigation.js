import React, { useState } from "react";
import { Affix, Divider, Breadcrumb, Menu, Button } from "antd";
import { Route, withRouter, Link } from "react-router-dom";
import { HomeOutlined, SmileFilled, SmileOutlined } from "@ant-design/icons";
function Navigation(props) {
  const { location } = props;
  const breadcrumbNameMap = {
    "/user": "uuuu",
    "/user/detail": "dddd",
  };
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  //   menu菜单
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div>
      <p>默认情况下，affix的元素还在文档流中，等触发之后就会添加fixed定位,脱离文档流</p>
      <p>由于是固定定位，不适用于绝对定位固定到某一个容器内的需求</p>

      <Affix
        offsetTop={20}
        onChange={(flag) => {
          console.log("flag:", flag);
        }}
      >
        <div>我是需要affix 固定定位的内容</div>
      </Affix>
      <Divider style={{ color: "white" }} />
      <h2>面包屑配合路由导航，选择使用，感觉用处不大</h2>
      <Route path="/" exact render={() => <div>home</div>} />
      <Route path="/user" exact render={() => <div>user概述信息</div>} />
      <Route path="/user/detail" exact render={() => <div>user详细信息</div>} />
      <Link to="/" style={{ marginRight: 10 }}>
        home
      </Link>
      <Link to="/user" style={{ marginRight: 10 }}>
        user概述信息
      </Link>
      <Link to="/user/detail" style={{ marginRight: 10 }}>
        user详细信息
      </Link>
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
      <Divider />
      <h2>菜单导航</h2>
      <p>空间不够时，会自动锁进</p>
      <p>模式有三种:水平垂直和内嵌，内嵌是垂直的，所有子项目也在一条线，而普通垂直，子项目会向左/右展开</p>
      <p>item是可用项目, item group可以用来分组，在样式上有分类功能</p>
      <p>item的title属性，在激活inlineCollapsed属性后才有用</p>

      <Menu mode="inline" inlineCollapsed={collapsed}>
        <Menu.Item danger icon={collapsed ? <HomeOutlined /> : ""}>
          菜单项
        </Menu.Item>
        <Menu.Item disabled>菜单项</Menu.Item>
        <Menu.SubMenu title="子菜单">
          <Menu.ItemGroup title="分组1">
            <Menu.Item>子菜单项1</Menu.Item>
          </Menu.ItemGroup>
          <Divider />
          <Menu.ItemGroup title="分组2">
            <Menu.Item>子菜单项1</Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>
        <Menu.Item title="设置收缩时展示的悬浮标题,覆盖children" icon={<SmileOutlined />}>
          最后一个
        </Menu.Item>
      </Menu>
      <Button onClick={toggleCollapsed}>toggle内联收缩</Button>
    </div>
  );
}

export default withRouter(Navigation);

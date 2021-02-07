import { HomeOutlined, SmileOutlined, UserOutlined } from "@ant-design/icons";
import { Affix, Breadcrumb, Button, Divider, Dropdown, Menu, Pagination, Typography } from "antd";
import React, { useState } from "react";
import { Link, Route, withRouter } from "react-router-dom";

const { Paragraph, Title } = Typography;
const { SubMenu } = Menu;
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

  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
          2nd menu item
        </a>
      </Menu.Item>
    </Menu>
  );
  const [currentPageSize, setCurrentPageSize] = useState(5);
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
      <p>item group之间可以用 Menu.Divider进行分割，但是不能用普通的Divider分割</p>
      <Menu
        mode="inline"
        inlineCollapsed={collapsed}
        onClick={(...rest) => {
          console.log(rest);
        }}
      >
        <Menu.Item danger icon={collapsed ? <HomeOutlined /> : ""}>
          菜单项
        </Menu.Item>
        <Menu.Item disabled>菜单项</Menu.Item>
        <SubMenu
          title="子菜单"
          onClick={(...rest) => {
            console.log("sub");
            console.log(rest);
          }}
        >
          <Menu.ItemGroup title="分组1">
            <Menu.Item>子菜单项1</Menu.Item>
          </Menu.ItemGroup>
          <Menu.Divider />
          <Menu.ItemGroup title="分组2">
            <Menu.Item>子菜单项1</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item title="设置收缩时展示的悬浮标题,覆盖children" icon={<SmileOutlined />}>
          最后一个
        </Menu.Item>
      </Menu>
      <Button onClick={toggleCollapsed}>toggle内联收缩</Button>
      <Divider />
      <p>最重要的是overlay属性，可以自定义下拉菜单的内容</p>
      <Paragraph style={{ color: "green" }}>Select 用于选择，而 Dropdown 是命令集合。</Paragraph>
      <Paragraph style={{ color: "green" }}>
        封装组件的时候也主要使用的是render props的应用, children是显示的内容,overlay是下拉弹出的内容
      </Paragraph>
      <br />
      <Paragraph style={{ color: "blue" }}>普通的dropdown和button类型的dropdown</Paragraph>
      <ol>
        <li>普通的dropdown没有icon属性，需要自己添加icon，button类型的可以控制icon</li>
        <li>button类型还可以像普通的button一样，控制大小，类型等</li>
        <li>共同的地方在于，都可以控制是否禁用，overlay的内容，弹出位置，和菜单是否显示</li>
        <li>buttonsRender属性可以用来去自定义带下拉菜单的按钮</li>
      </ol>

      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          Hover me <UserOutlined />
        </a>
      </Dropdown>
      <br />
      <Dropdown.Button
        overlay={menu}
        icon={<UserOutlined />}
        buttonsRender={([buttonLeft, buttonRight]) => {
          return [buttonRight, buttonLeft];
        }}
      >
        Hover me
      </Dropdown.Button>
      <Divider />
      <Title level={3}>分页器</Title>
      <ol>
        <li>几个重要的属性</li>
        <li>current:当前页数,可以受控，也可以不受控</li>
        <li>pageSize:当前每页的条数</li>
        <li>pageSizeOptions:每页可显示多少条，有哪几个选项</li>
        <li>showSizeChanger:可以显示页面条数控制器</li>
        <li>total数据总条数</li>
      </ol>
      <Pagination
        pageSize={currentPageSize}
        onChange={(page, pageSize) => {
          console.log("page:", page);
          console.log("pageSize:", pageSize);
        }}
        onShowSizeChange={(current, size) => {
          setCurrentPageSize(size);
        }}
        pageSizeOptions={[5, 10, 20]}
        showSizeChanger
        total={50}
        // 自定义渲染不同的按钮
        // itemRender={(page, type) => {
        //   return <div>{page}</div>;
        // }}
      />
    </div>
  );
}

export default withRouter(Navigation);

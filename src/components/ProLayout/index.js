import React, { useState } from "react";
import { Button, Descriptions, Result, Avatar, Space, Statistic } from "antd";
import { LikeOutlined, UserOutlined } from "@ant-design/icons";
import ProLayout, { PageContainer, SettingDrawer, PageLoading } from "@ant-design/pro-layout";
// import defaultProps from "./_defaultProps";

export default (props) => {
  console.log("props:", props);
  const [settings, setSetting] = useState({ fixSiderbar: true });
  const [pathname, setPathname] = useState("/welcome");
  return (
    <div
      id="test-pro-layout"
      style={{
        height: "100vh",
      }}
    >
      {/* <PageLoading /> */}
      <ProLayout
        // {...defaultProps}
        location={{
          pathname,
        }}
        waterMarkProps={{
          content: "Pro Layout",
        }}
        headerContentRender={() => {
          return <div>高级布局组件的header部分，可以被fixed</div>;
        }}
        menuFooterRender={(props) => {
          console.log("props:", props);
          return (
            <a
              style={{
                lineHeight: "48rpx",
                display: "flex",
                height: 48,
                color: "rgba(255, 255, 255, 0.65)",
                alignItems: "center",
              }}
              href="https://preview.pro.ant.design/dashboard/analysis"
              target="_blank"
              rel="noreferrer"
            >
              <img
                alt="pro-logo"
                src="https://procomponents.ant.design/favicon.ico"
                style={{
                  width: 16,
                  height: 16,
                  margin: "0 16px",
                  marginRight: 10,
                }}
              />
              {!(props === null || props === void 0 ? void 0 : props.collapsed) && "Preview Pro"}
            </a>
          );
        }}
        menuHeaderRender={(logo, title) => {
          return (
            <div>
              {title}:{logo}
            </div>
          );
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        menuItemRender={(item, dom) => (
          <a
            onClick={() => {
              setPathname(item.path || "/welcome");
              console.log("item:", item);
              console.log("dom:", dom);
            }}
          >
            {dom}
          </a>
        )}
        rightContentRender={() => (
          <div>
            <Avatar shape="square" size="small" icon={<UserOutlined />} />
            我是自定义头右侧的内容
          </div>
        )}
        footerRender={() => {
          return <div>自定义的高级布局footer内容</div>;
        }}
        {...settings}
        title="高级布局title"
        // pure={true}
        // loading={true}
        location={props.history.location}
        // fixedHeader
        // fixSiderbar
        route={{
          path: "/",
          routes: [
            {
              path: "/welcome",
              name: "欢迎",
              component: "./Welcome",
            },
          ],
        }}
      >
        <ul>
          <li>prolayout的作用:提供切换布局的能力，包括三种顶部菜单，侧边菜单，以及混合菜单的三种模式</li>
          <li>prolayout可以自动生成菜单，无需手动引入Menu</li>
          <li>
            header部分支持的属性
            <ul style={{ marginLeft: "20px" }}>
              <li>headerHeight:自定义header高度</li>
              <li>header_theme:头部主题</li>
              <li>headerContentRender:自定义渲染内容</li>
            </ul>
          </li>
          <li>
            在sider区域内,自动生成menu
            <ul style={{ marginLeft: "20px" }}>
              <li>menu的内容是根据routes提供信息创建</li>
              <li>menuHeaderRender:自定义菜单头部，包括logo和标题</li>
              <li>menuContentRender:菜单内容自定义渲染，根据route数据</li>
              <li>menuFooterRender:自定义菜单尾部,这个函数只有在layout是side和top形式的时候会触发，在mix不触发</li>
            </ul>
          </li>
          <li>
            <ul>footer区域也支持自定义配置</ul>
          </li>
          <li>location:显示当前的路径信息，用处不大</li>
          <li>
            setting:设置整个高级布局组件的配置，包括导航主题，布局方式top/sider，在布局为top的情况下，内容区宽度fluid或者fixed，固定头部，固定侧边栏等
            <a href="https://procomponents.ant.design/components/layout/#settings">setting设置</a>
          </li>

          <li>collapse:菜单siderbar是否收齐</li>
        </ul>
        <div style={{ backgroundColor: "red" }}>pageContainer标签内容</div>
      </ProLayout>
      <SettingDrawer
        pathname={pathname}
        getContainer={() => document.getElementById("test-pro-layout")}
        settings={settings}
        onSettingChange={(changeSetting) => {
          console.log("changeSetting:", changeSetting);
          setSetting(changeSetting);
        }}
        disableUrlParams
      />
    </div>
  );
};

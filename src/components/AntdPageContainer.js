import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { PageContainer } from "@ant-design/pro-layout";

export default function AntdPageContainer() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div style={{ height: "2000px" }}>
      <ul>
        <li>页面容器组件，可以直接作为一个新开发页面的基础模板，整体基于pageheader组件</li>
        <li>header属性: 基于PageHeader组件，包含了一个页面中常用的内容展示</li>
        <li>extra属性:页面级操作</li>
        <li>tablist属性:基于tab组件,兼容Tab组件的所有属性</li>
        <li>fixedHeader属性：滑动时，包括header和tablist的内容都会固定在头部</li>
        <li>loading属性控制整个页面的加载,所以children文字不显示</li>
      </ul>
      <PageContainer
        fixedHeader
        loading={loading}
        header={{
          title: "页面标题",
          breadcrumb: {
            routes: [
              {
                path: "",
                breadcrumbName: "一级页面",
              },
              {
                path: "",
                breadcrumbName: "二级页面",
              },
              {
                path: "",
                breadcrumbName: "当前页面",
              },
            ],
          },
        }}
        content="页面容器组件的content内容文字"
        tabList={[
          {
            tab: "基本信息",
            key: "base",
            children: "基本信息",
          },
          {
            tab: "详细信息",
            key: "info",
            children: "详细信息",
          },
        ]}
        extra={[
          <Button key="3">操作</Button>,
          <Button key="2">操作</Button>,
          <Button key="1" type="primary">
            主操作
          </Button>,
        ]}
        footer={[
          <Button key="rest">重置</Button>,
          <Button key="submit" type="primary">
            提交
          </Button>,
        ]}
      >
        页面容器组件的children内容文字
      </PageContainer>
    </div>
  );
}

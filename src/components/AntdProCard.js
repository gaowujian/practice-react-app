import React from "react";
import ProCard from "@ant-design/pro-card";

export default () => {
  return (
    <>
      <ul>
        <li>procard是一个 row, col 和card的集合体，给了card业内布局的能力</li>
        <li>1. 具备普通card的能力，包括支持tab</li>
        <li>2. 使用row col提供的栅格化布局能力</li>
      </ul>
      <ul>
        属性说明
        <li>layout:内容的布局方式，center支持垂直居中</li>
        <li>direction:有盒子嵌套的时候，flex-direction盒子方向</li>
      </ul>
      <ProCard direction="column" ghost gutter={[0, 8]}>
        <ProCard layout="center" bordered>
          colSpan - 24
        </ProCard>
        <ProCard colSpan={12} layout="center" bordered>
          colSpan - 12
        </ProCard>
        <ProCard colSpan={8} layout="center" bordered>
          colSpan - 8
        </ProCard>
        <ProCard colSpan={0} layout="center" bordered>
          colSpan - 0
        </ProCard>
      </ProCard>
      <ProCard gutter={8} title="24栅格" style={{ marginTop: 8 }}>
        <ProCard colSpan={12} layout="center" bordered>
          colSpan-12
        </ProCard>
        <ProCard colSpan={6} layout="center" bordered>
          colSpan-6
        </ProCard>
        <ProCard colSpan={6} layout="center" bordered>
          colSpan-6
        </ProCard>
      </ProCard>
      <ProCard style={{ marginTop: 8 }} gutter={8} ghost>
        <ProCard colSpan="200px" layout="center" bordered>
          colSpan - 200px
        </ProCard>
        <ProCard layout="center" bordered>
          Auto
        </ProCard>
      </ProCard>
      <ProCard style={{ marginTop: 8 }} gutter={8} ghost>
        <ProCard bordered layout="center">
          Auto
        </ProCard>
        <ProCard colSpan="30%" bordered>
          colSpan - 30%
        </ProCard>
      </ProCard>
    </>
  );
};

import React from "react";
import ProCard from "@ant-design/pro-card";

export default () => {
  return (
    <>
      <ul>
        <li>procard是一个 row, col 和card的集合体，赋予了card布局的能力</li>
        <li>1. 具备普通card的能力，包括支持tab</li>
        <li>2. 使用row col提供的栅格化布局能力，支持span gutter等属性和响应式</li>
      </ul>
      <ul>
        属性说明
        <li>layout:内容的布局方式，center支持垂直居中</li>
        <li>direction:有盒子嵌套的时候，flex-direction盒子方向</li>
        <li>gutter:表示间隔距离，如果用数组[0,10]表示横向padding是0，纵向padding是5</li>
        <li>
          split:用来切分card的内容区域，horizontal表示横向切一刀，分为上下两个布局card，vertial表示纵向一刀，分为左右两个card
        </li>
        <li>
          对比procard嵌套布局和split的不同就在于，布局的时候会自动添加一些padding，但是split只是切分了一个容器的内容区域
        </li>
      </ul>

      <h2>procard实现布局</h2>
      <ProCard direction="column" ghost gutter={[0, 10]}>
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
      <ProCard
        gutter={8}
        title="24栅格,嵌套card布局，父子card之前有padding"
        style={{ marginTop: 8, borderColor: "red" }}
        bordered
      >
        <ProCard colSpan={12} layout="center" style={{ marginTop: 8, borderColor: "blue" }} bordered>
          colSpan-12
        </ProCard>
        <ProCard colSpan={6} layout="center" style={{ marginTop: 8, borderColor: "blue" }} bordered>
          colSpan-6
        </ProCard>
        <ProCard colSpan={6} layout="center" style={{ marginTop: 8, borderColor: "blue" }} bordered>
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
        <ProCard colSpan="70%" bordered layout="center">
          Auto
        </ProCard>
        <ProCard colSpan="30%" bordered>
          colSpan - 30%
        </ProCard>
      </ProCard>
      <h2>procard实现切分，可以把card的content区域切分</h2>
      <ProCard
        title="被切分的父亲card,父子card之前没有间隔"
        split="horizontal"
        bordered
        headerBordered
        extra={"额外内容"}
      >
        <ProCard style={{ color: "red" }}>
          使用split切分来布局的话，就很容易避免了手动嵌套div，并设置flex和padding等等
        </ProCard>
        <ProCard split="vertical">
          <ProCard title="左侧title" bordered colSpan="50%" headerBordered>
            左侧内容
          </ProCard>
          <ProCard title="右侧title" bordered colSpan="50%" headerBordered>
            右侧内容
          </ProCard>
        </ProCard>
      </ProCard>
    </>
  );
};

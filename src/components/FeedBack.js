import React from "react";
import { Typography, Divider, Alert, Drawer, Button } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Title } = Typography;
function FeedBack() {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Title>alert警示框组件</Title>
      <ol>
        <li>用于展示警告信息，长久显示不会消失，用户可自行关闭</li>
        <li>和表单验证一样，分几个状态, success, error, warning,info，默认info，开启banner的时候，默认warning</li>
        <li>支持用户自己关闭</li>
        <li>信息内容包括title和description,不接受children的内容</li>
        <li>showIcon表示是否展示icon信息，有默认值，同时支持自定义icon</li>
      </ol>
      <Alert showIcon message="alert信息" icon={<SmileOutlined />} />
      <Alert showIcon type="error" message="alert信息" closable />
      <Divider orientation="left">Drawer</Divider>
      <Title>Drawer抽屉组件</Title>
      <ol>
        <li>从屏幕的边缘划出一个浮层</li>
        <li>抽屉本身不具备把其他元素推开的能力，可以通过js计算来制造动画效果</li>
        <li>getContainer属性，表明挂在到哪个元素节点，默认为body</li>
        <li>给容器添加relative 给drawer添加绝对定位，可以实现容器内的drawer，否则默认是body</li>
        <li>当需要查看一个user的detail的时候，也可以弹出一个drawer，并搭配Descriptions</li>
        <li>当placement为top和bottom的时候，表示从上下弹出，需要配置height，默认为256</li>
        <li>当placement为left和right的时候，表示从左右弹出，需要配置width，默认为256</li>
        <li>mask是否有遮罩,maskClosable,点击蒙层是否能关闭,maskstyle遮罩的样式</li>
      </ol>
      <Button
        type="primary"
        onClick={() => {
          setVisible(!visible);
        }}
      >
        Open
      </Button>
      <div style={{ position: "relative", height: "400px", width: "100%", overflow: "hidden", border: "1px solid #3498db" }} className="drawer-container">
        <Drawer
          title="Basic Drawer"
          placement="bottom"
          getContainer={false}
          onClose={() => {
            setVisible(false);
          }}
          visible={visible}
          style={{ position: "absolute" }}
          maskStyle={{
            backgroundColor: "#95a5a6",
          }}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </div>
    </div>
  );
}

export default FeedBack;

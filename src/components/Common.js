import React, { useState } from "react";
import { Button, message, Typography } from "antd";
import HomeOutlined from "@ant-design/icons/HomeOutlined";
import SmileTwoTone from "@ant-design/icons/SmileTwoTone";
import SmileFilled from "@ant-design/icons/SmileFilled";

const { Title, Paragraph, Text, Link } = Typography;
function Common() {
  const [ellipsis] = useState(true);
  return (
    <div>
      {" "}
      {/* type主要有5中 primary default text link dashed */}
      {/* 配合type有五个按钮状态 danger loading ghost disable */}
      <Button
        type="primary"
        icon={<HomeOutlined />}
        shape="circle"
        danger
        onClick={() => {
          message.success("you are so handsome!");
        }}
      ></Button>
      <Text> button组件的使用</Text>
      <br />
      <Button
        type="default"
        icon={<HomeOutlined />}
        shape="circle"
        danger
        onClick={() => {
          message.success("you are so handsome!");
        }}
      ></Button>
      <Button type="link" href="http://www.baidu.com" target="_blank">
        Link Button
      </Button>
      <SmileTwoTone spin />
      <br />
      <Typography>
        <Title mark>我是title</Title>
        <Text type="danger"> 关于ellipsis属性，针对text和paragraph有增强，针对title只支持布尔值</Text>
        <Paragraph delete mark>
          我是段落
        </Paragraph>

        <Text
          style={ellipsis ? { width: 100 } : undefined}
          ellipsis={ellipsis ? { tooltip: "I am ellipsis now!" } : false}
        >
          Ant Design, a design language for background applications, is refined by Ant UED Team.
        </Text>
        <Link href="https://ant.design" target="_blank">
          Ant Design (Link)
        </Link>
        <Text
          copyable={{
            text: "可以编辑",
            onCopy: function () {
              console.log("good");
            },
            icon: "???",
            tooltips: <SmileFilled />,
          }}
        >
          可编辑文字
        </Text>
      </Typography>
    </div>
  );
}

export default Common;

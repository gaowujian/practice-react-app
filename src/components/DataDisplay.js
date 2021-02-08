import React from "react";
import { Avatar, Badge, Button, Divider, Card, Typography, Dropdown, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Meta } = Card;
const { Title, Text, Paragraph } = Typography;
function DataDisplay() {
  return (
    <div>
      <Avatar
        icon={<UserOutlined />}
        size="large"
        shape="circle"
        src="https://gss3.bdstatic.com/84oSdTum2Q5BphGlnYG/timg?wapp&quality=80&size=b150_150&subsize=20480&cut_x=0&cut_w=0&cut_y=0&cut_h=0&sec=1369815402&srctrace&di=e982d6240a0c43dfa77180094ae83db7&wh_rate=null&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fpic%2Fitem%2F297a0bfc1e178a823f26bdc2e103738da977e81c.jpg"
      />
      <Badge count={10}>
        <Button type="dashed">带徽标的按钮</Button>
      </Badge>
      <Divider />
      <ol>
        <li>Card提供了几个基本功能</li>
        <li>头部，内容区域和底部的划分</li>
        <li>头部可以带操作按钮</li>
        <li>内容区域可以使用meta灵活展示内容</li>
        <li>底部可以使用actions添加多个操作</li>
        <li>card支持内嵌，也就是支持一个card内容区域的嵌套</li>
        <li>和tab进行了融合，可以在一个card内进行tab的相关操作</li>
      </ol>
      <Card
        title="Default size card"
        extra={
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item>首页</Menu.Item>
                <Menu.Item>关于</Menu.Item>
                <Menu.Item>个人中心</Menu.Item>
              </Menu>
            }
          >
            <Button>更多内容</Button>
          </Dropdown>
        }
        style={{ width: 300 }}
        actions={[<Avatar icon={<UserOutlined />} />, <Button type="primary">主按钮</Button>]}
      >
        <Card
          title="Default size card"
          extra={<a href="#">More</a>}
          cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        ></Card>
        <Meta avatar={<UserOutlined />} title="内嵌图片" description="内嵌car展示" />
      </Card>

      <p>Meta只是一个配合Card使用的，用于在底部提供容器信息的title和描述信息，我们也可以用title和paragraph替代</p>
      <p>Meta是一个小巧的组件，把avatar（头像和图标），title和description等常用的信息弄成一个小组件</p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
          <Meta title="Europe Street beat" description="www.instagram.com" />
        </Card>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
          <Title level={5}>Europe Street beat</Title>
          <Paragraph>www.instagram.com</Paragraph>
        </Card>
      </div>
    </div>
  );
}

export default DataDisplay;

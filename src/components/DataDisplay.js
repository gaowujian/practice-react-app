import React, { useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  Divider,
  Card,
  Typography,
  Dropdown,
  Menu,
  Collapse,
  Descriptions,
  Empty,
  List,
  Tabs,
  Tooltip,
  Popover,
  Tree,
} from "antd";
import { UserOutlined, CaretRightOutlined } from "@ant-design/icons";

const { Meta } = Card;
const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;
const { TabPane } = Tabs;
function DataDisplay() {
  const data = [
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
  ];
  const treeData = [
    {
      title: "parent 1",
      key: "0-0",
      children: [
        {
          title: "parent 1-0",
          key: "0-0-0",
          disabled: true,
          children: [
            {
              title: "leaf",
              key: "0-0-0-0",
              disableCheckbox: true,
            },
            {
              title: "leaf",
              key: "0-0-0-1",
            },
          ],
        },
        {
          title: "parent 1-1",
          key: "0-0-1",
          children: [{ title: <span style={{ color: "#1890ff" }}>sss</span>, key: "0-0-1-0" }],
        },
      ],
    },
  ];
  const [activeKey, setActiveKey] = useState("1");
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
      <Divider />
      <Title level={5}>Calender组件 </Title>
      <Paragraph mark>按照日历形式展示数据的容器,不只是为了显示日历，更重要的是容器作用，可以按日期显示数据</Paragraph>
      <Divider />
      <Title level={5}>Collapse组件 </Title>
      <ol>
        <li>可以控制折叠几个，折叠的图标，折叠行有没有操作按钮</li>
        <li>还可以控制折叠是否有背景，以及是否支持可折叠</li>
        <li>可以自定义每个折叠panel的背景色，园角，边距和图标</li>
      </ol>
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        className="site-collapse-custom-collapse"
      >
        <Panel header="This is panel header 1" key="1" className="site-collapse-custom-panel">
          <p>emmdkjksjrekjrekjre</p>
        </Panel>
        <Panel header="This is panel header 2" key="2" className="site-collapse-custom-panel">
          <p>emmdkjksjrekjrekjre</p>
        </Panel>
      </Collapse>
      <Divider />
      <Title level={5}>Descriptions </Title>
      <ol>
        <li>本质是一个div头部和table内容区域的结合体</li>
        <li>描述列表，主要是为了可读数据的展示，而不是数据的修改</li>
        <li>数据项和数据值主要有水平方向展示和垂直方向展示两种方式</li>
        <li>column表示每一行可容纳的数据项的数量</li>
        <li>colon表示分号，控制数据项和数据值之间是否有分号</li>
        <li>item上有span属性和table 的td上的span意思一致，表示这个item占据了几个标准item的大小</li>
      </ol>
      <Descriptions title="个人信息" column={2} colon={true}>
        <Descriptions.Item label="name" span={2}>
          高午剑
        </Descriptions.Item>
        <Descriptions.Item label="age">28</Descriptions.Item>
        <Descriptions.Item label="address">保定市涞水县</Descriptions.Item>
      </Descriptions>
      <Divider />
      <Title level={5}>Empty </Title>
      <ol>
        <li>表示数据为空的一个占位符号，可以配置图片和文字内容</li>
      </ol>
      <Empty description="无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      <Title level={5}>List </Title>
      <ol>
        <li>list是一个通用的列表，用来替代ul li</li>
        <li>像一个卡片一样，也支持列表的头部和尾部</li>
        <li>dataSource接受一个数组来存储列表信息</li>
        <li>renderItem自自定义每一额element元素</li>
        <li>List.Item.Meta和Card.Meta都一样，只是一个常用信息的集合 avatar,title,description</li>
        <li>list组件也具备分页的功能，还有loadmore的功能，可以被看作一个建议的table了</li>
        <li>itemLayout可以控制item组件中的 content和actions是水平还是垂直方向摆列</li>
      </ol>
      <List
        header={<div>列表头部</div>}
        footer={<div>列表尾部</div>}
        bordered={false}
        split={false}
        dataSource={data}
        itemLayout="vertical"
        renderItem={(item) => (
          <List.Item
            actions={[<Button type="primary">primary</Button>, <Button type="link">link</Button>]}
            extra={<Button type="dashed">extra</Button>}
          >
            <List.Item.Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={<a href="https://ant.design">{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
            <Paragraph type="success">内容信息</Paragraph>
          </List.Item>
        )}
        pagination={{
          pageSize: 3,
        }}
      />
      <Title level={5}>Tabs标签页 </Title>
      <ol>
        <li>组件分为Tab和Panel组件</li>
        <li>关于标签，我们可以设置标签的位置，上下左右，设置标签的样式type类型，标签禁用</li>
        <li>当type是edit-card的时候，支持标签页的动态添加和删除，还可以自定义标签页的创建方式</li>
        <li>tabs组件是否有extra操作</li>
        <li>当tabs标签也超出了容器范围会自动省略，同时支持滑动</li>
      </ol>
      <Tabs
        activeKey={activeKey}
        tabPosition="left"
        type="editable-card"
        onChange={(key) => {
          console.log(key);
          setActiveKey(key);
        }}
        onEdit={(targetKey, action) => {
          console.log("targetKey:", targetKey);
          console.log("action:", action);
        }}
        addIcon={<Button type="primary">add</Button>}
        tabBarExtraContent={[<Button type="primary">primary</Button>, <Button type="dashed">dashed</Button>]}
      >
        <TabPane tab="标签1" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="标签2" key="2">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
      <Divider />

      <Title level={5}>Tooltip文字提示 </Title>
      <ol>
        <li>文字提示组件，不负责提供复杂操作，只是一个title属性的替代品</li>
      </ol>
      <Tooltip title="tooltip" placement="bottomRight">
        hover me
      </Tooltip>
      <Divider />

      <Title level={5}>Popover气泡卡片 </Title>
      <ol>
        <li>和tooltip不同，我们可以让popover的content承担一些更复杂的操作</li>
        <li>tooltip和popover还有很多公有属性，但是用处比较少，</li>
      </ol>
      <Popover title="popover" placement="left" content={<Button type="primary">primary</Button>}>
        hover me
      </Popover>

      <Divider />

      <Title level={5}>tree树形控件 </Title>
      <ol>
        <li>多层次的结构列表，文件夹，组织架构，国家地区等</li>
        <li>用的时候查看详细api</li>
      </ol>
      <Tree
        checkable
        defaultExpandedKeys={["0-0-0", "0-0-1"]}
        defaultSelectedKeys={["0-0-0", "0-0-1"]}
        defaultCheckedKeys={["0-0-0", "0-0-1"]}
        // onSelect={onSelect}
        // onCheck={onCheck}
        treeData={treeData}
        draggable
      />
    </div>
  );
}

export default DataDisplay;

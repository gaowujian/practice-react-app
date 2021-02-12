import { UploadOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Layout, Popconfirm, Row, Space, Typography, Upload } from "antd";
import React from "react";
const { Title } = Typography;
const { Header, Content, Sider, Footer } = Layout;
function LayoutComponent() {
  return (
    <div>
      <Title>Divider分割线</Title>
      <ol>
        <li>主要用来分割内容，形成区域感</li>
        <li>可以在水平和垂直方向添加分割线</li>
        <li>可以在分割线上添加文字,主要用于水平分割线</li>
      </ol>
      <div>
        text11
        <Divider type="horizontal" orientation="right" plain>
          666
        </Divider>
        text22
      </div>
      <Divider>分割线</Divider>
      <Title>Space间距</Title>
      <ol>
        <li>本质就是一个inline-flex的弹性布局</li>
        <li>比较使用于行内展示一组元素，并添加间距</li>
        <li>支持配置子元素间的margin，间距大小，配置对齐方式</li>
        <li>配置自动换行</li>
        <li>配置一组元素间的分割符，等价于手动在元素间添加Divider</li>
      </ol>
      <Space size={10} direction="horizontal" split={<Divider type="vertical" />}>
        Space
        <Button type="primary">Button</Button>
        <Upload>
          <Button>
            <UploadOutlined /> Click to Upload
          </Button>
        </Upload>
        <Popconfirm title="Are you sure delete this task?" okText="Yes" cancelText="No">
          <Button>Confirm</Button>
        </Popconfirm>
      </Space>
      <span>内联元素</span>
      <Divider>分割线</Divider>
      <Title>antd中的Grid栅格布局，本质是使用flex实现的布局，而不是grid布局</Title>
      <ol>
        <li>使用须知</li>
        <li>通过 row 在水平方向建立一组 column（简写 col）。每行内容都被划分为24份</li>
        <li>row就是一个flex container, col就是flex item</li>
        <li>row组件支持 justify和 align表示水平和垂直对齐</li>
        <li>col组件支持flex属性，用于填充</li>
        <li>
          <strong style={{ color: "red" }}>你的内容应当放置于 col 内，并且，只有 col 可以作为 row 的直接元素。</strong>
        </li>
        <li>row的gutter表示间距，单位是px，而col的span表示flex，没有单位，表示24份占几份，如果span是6，那么flex:0 0 25%</li>
        <li>如果支持响应式，可以针对col的span属性，修改不同breakpoint的数值</li>
        <li>Grid组件提供了useBreakpoint,可以提供个性化布局</li>
        <li>offset是一个比较灵活的属性,提供给col,可以方便的使用margin进行偏移</li>
      </ol>
      <Divider>分割线</Divider>
      <Title>Layout组件</Title>
      <ol>
        <li>主要是为了协助页面（页面组件）的整体布局</li>
        <li>主要包含layout header, sider, content和 footer 等5个组件，可以在layout组件中进行嵌入</li>
      </ol>
      <Row>
        <Col span={6}>
          <Card
            title=" 'Layout'  layout组件就是一个默认垂直方向的flex容器，同时也可以作为一个flex item
                 如果layout下有sider, 那么flex变为水平方向"
          >
            <br />
            display: flex;
            <br />
            flex: 1 1 auto;
            <br />
            flex-direction: column;
            <br /> min-height: 0;
            <br /> background: #f0f2f5
          </Card>
        </Col>
        <Col span={6}>
          <Card title=" 'Header' 自带padding，并保证上下剧中">
            <br />
            padding: 0 50px;
            <br />
            height: 64px;
            <br />
            color: rgba(0,0,0,.85);
            <br />
            line-height: 64px;
            <br />
            background: #001529;
            <br />
            flex: 0 0 auto
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Content' 内容区域 主要就是保证了在容器内，可以让content涵盖可用空间">
            flex: 1 1 auto; <br />
            min-height: 0;
            <br />
          </Card>
        </Col>
        <Col span={6}>
          <Card title=" 'Footer' 自带padding，并只占用自己所需空间">
            padding: 24px 50px; <br />
            color: rgba(0,0,0,.85); <br />
            font-size: 14px; <br />
            background: #f0f2f5 <br />
            flex: 0 0 auto
            <br />
          </Card>
        </Col>
        <Col>
          <Card title="  'Sider' 自带默认样式，同时有功能   ">
            <br />
            flex: 0 0 200px;
            <br />
            max-width: 200px;
            <br />
            min-width: 200px;
            <br />
            width: 200px;
            <br />
            position: relative;
            <br />
            min-width: 0;
            <br />
            background: #001529;
            <br />
            transition: all .2s;
          </Card>
        </Col>
      </Row>

      <pre></pre>
      <Layout>
        <Sider>Sider</Sider>
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default LayoutComponent;

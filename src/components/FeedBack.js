import React from "react";
import { Typography, Divider, Alert, Drawer, Button, message, Modal, Space, notification, Popconfirm, Skeleton, Spin } from "antd";
import { SmileOutlined, ExclamationCircleFilled, BookOutlined, UserOutlined, LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Title } = Typography;
const { success } = Modal;
function FeedBack() {
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("model text");
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return (
    <div>
      <Title>分类</Title>
      <ol>
        <li>反馈类型组件主要分为两类:</li>
        <li>操作前,如果弹出操作,ui弹出类型:全局的 modal 和 drawer 局部: popconfirm, 和Modal.confirm非常像，都有异步关闭的能力</li>
        <li>操作后，完成后反馈:message，不管是任何形式的确认和取消都可以搭配message</li>
        <li>静态提示，本身没有很强的交互性: alert</li>
        <li>一般交给系统主动推送消息时使用 notification</li>
      </ol>
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
      <Divider />
      <Title level={5}>message全局的消息提示组件</Title>
      <ol>
        <li>全局的消息提示组件</li>
        <li>不同于alert，它是会自动消失的，也是有success，warning，info, error,loading等类型</li>
        <li>可以自定义消失的延迟时间</li>
        <li>message.xx(content,delay,onclose).then(afterclose)标准格式</li>
        <li>可以配置显示信息，消失的延迟时间，关闭的回调函数已经关闭之后的回调函数</li>
        <li>同时也支持传入config对象配置信息,包括content,delay,onclose,icon</li>
      </ol>
      <div>
        <Button
          onClick={() => {
            message.open({
              content: "新年快乐",
              duration: 2,
              type: "success",
              icon: <SmileOutlined />,
            });
            // message.success("成功");
          }}
        >
          触发message
        </Button>
      </div>
      <Divider />
      <Title level={5}>modal/dialog 对话框</Title>
      <ol>
        <li>需要用户处理事务，不希望页面打断业务流程，可以弹出浮层来进行处理，和drawer是一样的</li>
        <li>我们所用的Modal除了包含普通的Modal还有融合一些语法糖作为静态方法，以及destroyAll等方法</li>
        <li>最普通的方式是封装了rc的Dialog组件</li>

        <li>第二种用法 使用 confirm() 可以快捷地弹出确认框。onCancel/onOk 返回 promise 可以延迟关闭。</li>
        <li>confirm的本质是在body上添加了一个div，然后在这个div上去调用了ReactDom.render去渲染了一个Dialog组件</li>
        <li>这个dialog的title和footer属性都是''，表示不使用rc Dialog这俩属性</li>
        <li>但是自己在content的区域去进行了header content 操作按钮的填充</li>
        <li>我们使用的 Modal.success等都是 confirm的语法糖,做了一层高阶组件,把onCancel属性设置为false</li>
        <li>所以confirm中的取消按钮就为空，只有一个确认按钮</li>
      </ol>
      <>
        <Button
          type="primary"
          onClick={() => {
            setModalVisible(true);
          }}
        >
          Open Modal
        </Button>

        <Modal
          // footer={<div>底部区域</div>}
          title={"great modal"}
          visible={modalVisible}
          onOk={() => {
            setModalVisible(false);
            // message.success("Click on ok");
            Modal.confirm({
              title: "modal confirm",
              content: "content",
              okText: "confirm确认",
              cancelText: "cancel文本",
            });
          }}
          onCancel={() => {
            setModalVisible(false);
            message.error("Click on false");
          }}
          okText="确认"
          cancelText="取消"
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </>
      <div>
        <Space size={20}>
          <Button
            onClick={() =>
              Modal.info({
                title: "孤独的确认框",
                content: (
                  <div>
                    <p>一个普通的单确认按钮,只为确认而生</p>
                  </div>
                ),
                okText: "ok",
                cancelText: "cancel",
                icon: <BookOutlined />,
              })
            }
          >
            Modal.Info
          </Button>
          <Button
            onClick={() => {
              success({
                title: "Do you Want to delete these items?",
                icon: <ExclamationCircleFilled />,
                content: modalText,
                onOk() {
                  return new Promise((resolve) => {
                    setConfirmLoading(true);
                    let i = 2;
                    const timer = setInterval(() => {
                      setModalText(`The modal will be closed after ${--i} seconds`);
                    }, 1000);

                    setTimeout(() => {
                      setVisible(false);
                      setConfirmLoading(false);
                      clearInterval(timer);
                      resolve();
                    }, 2000);
                  });
                },
                onCancel() {
                  console.log("Cancel");
                },
                okText: "ok",
                cancelText: "cancel",
                confirmLoading: { confirmLoading },
              });
            }}
          >
            异步关闭modal
          </Button>
        </Space>
      </div>
      <Divider />
      <Title level={5}>notification 通知提醒框</Title>
      <ol>
        <li>较为复杂的通知内容，系统主动推送的，一般不是用户自己的操作反馈</li>
        <li>和message类似，没有jsx形式</li>
      </ol>
      <Button
        type="primary"
        onClick={() => {
          notification.open({
            message: "Notification Title",
            description: "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
            onClick: () => {
              console.log("Notification Clicked!");
            },
          });
        }}
      >
        Open the notification box
      </Button>
      <Divider />
      <Title level={5}>popconfirm 弹出确认框</Title>
      <ol>
        <li>对目标元素的操作需要用户进一步确认，例如点击删除之后，提示用户是否确认删除</li>
        <li>这个时候popconfirm和 Modal中的confirm效果类似，但是更轻量，只在元素附近提示，而不是全屏提示</li>
        <li>同时popconfirm不适合添加过多信息，只是适合简短的确认，更多的内容放在modal中</li>
        <li>popconfirm和message进行搭配，确认之后弹出成功message，取消之后弹出失败message</li>
        <li>下面两个例子展示 popconfirm和 modal.confirm的区别</li>
      </ol>
      <Popconfirm
        title="Are you sure to delete this task?"
        onConfirm={() => {
          message.success("Click on Yes");
        }}
        onCancel={() => {
          message.error("Click on No");
        }}
        okText="Yes"
        cancelText="No"
        placement="bottomRight"
        icon={<UserOutlined />}
      >
        <a href="http">Delete</a>
      </Popconfirm>

      <br />

      <a
        href="http://"
        onClick={(e) => {
          e.preventDefault();
          Modal.confirm({
            title: "Are you sure to delete this task?",
            onOk: function () {
              message.error("Click on Yes");
            },
            onCancel: function () {
              message.success("Click on no");
            },
            icon: <SmileOutlined />,
            okText: "Yes",
            cancelText: "No",
          });
        }}
      >
        Delete
      </a>
      <Divider />
      <Title level={5}>Result</Title>
      <ol>
        <li>有重要操作需要通知用户的时候</li>
        <li>例如页面访问不到,可以直接用Result做一个404的组件</li>
      </ol>
      <Divider />
      <Title level={5}>占用符 Skeleton 和 spin</Title>
      <Skeleton />
      <Spin spinning indicator={antIcon}>
        <span style={{ display: "inline-block", width: "300px", height: "300px", backgroundColor: "red" }}>content</span>
      </Spin>
    </div>
  );
}

export default FeedBack;

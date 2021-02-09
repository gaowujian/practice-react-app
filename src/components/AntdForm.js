import React from "react";
import { Typography, Form, Input, Button, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import Checkbox from "antd/lib/checkbox/Checkbox";

const { Title } = Typography;

function AntdForm() {
  const [form] = useForm();
  function onFinish(values) {
    console.log("values:", values);
    console.log(form.getFieldValue("username"));
    console.log(form.getFieldValue("gender"));
  }
  function onFinishFailed(errorInfo) {
    console.log("errorInfo:", errorInfo);
  }

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  return (
    <div>
      <Title level={5}>form表单</Title>
      <ol>
        <li>作用主要是用来信息收集以及输入数据的类型校验</li>
        <li>在class组件中保存到一个formRef上，在函数中，使用hooks保存到一个闭包中</li>
        <li>常用的onFished,onFishedFail</li>
        <li>Form组件和其他组件 Input Radio Checkbox Select 深度结合, Form.Item只需要添加 name是username, 内部input的值</li>
        <li>Form.Item组件表单字段组件，用于数据双向绑定、校验、布局等。添加name属性之后，内部组件的value和onchange就不需要再去手动控制，会在onFish事件中全部收集过来</li>
        <li>布局有水平和垂直，主要体现在item的label和内部组件的位置变化</li>
        <li>校验规则优先级 Form.Item中每个rule的message 优先于 Form配置的整体validatemessage 优先于 默认配置</li>
        <li>rules制定了校验规则，必须Form.Item先有name属性，一般校验不满足，使用validator函数做自定义校验</li>
        <li>如果还不能满足需求，可以通过validateStatus和help进行更高程度的自定义校验</li>
        <li>原理就是自己在onchange的过程中去校验，并将validateStatus和help添加状态，去修改他们来弹出校验结果</li>
        <li>不然即使是用validator函数，其他的辅助信息也是去自动调用和弹出的</li>
      </ol>
      <Form
        size="large"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="horizontal"
        validateMessages={validateMessages}
        validateTrigger="onChange"
        labelAlign="left"
        labelCol={{ span: 6 }}
        wrapperCol={{ flex: 1 }}
        requiredMark="optional"
      >
        <Form.Item label="用户名" requiredMark={false}>
          <Form.Item name="username" noStyle label="username" rules={[{ required: true }, { max: 5, message: "你都写超了还写呢" }]}>
            <Input />
          </Form.Item>
          <span>description</span>
        </Form.Item>
        <Form.Item label="密码" name="password" rules={[{ required: true, max: 5 }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item label="性别" name="gender">
          <Select
            allowClear
            options={[
              { label: "男", value: "male" },
              { label: "女", value: "female" },
            ]}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6 }}>
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) => (value ? Promise.resolve() : Promise.reject("Should accept agreement")),
              },
            ]}
          >
            <Checkbox>请仔细阅读协议内容</Checkbox>
          </Form.Item>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6 }}>
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value, callback) => {
                  return value ? Promise.resolve() : Promise.reject("Should accept agreement");
                },
              },
            ]}
          >
            <Input />
          </Form.Item>
          <span>description</span>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Input type="submit" value="提交" />
        </Form.Item>
      </Form>
    </div>
  );
}

export default AntdForm;

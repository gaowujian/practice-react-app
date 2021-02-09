import React, { useState } from "react";
import { Form, InputNumber, Checkbox } from "antd";
import { useForm } from "antd/lib/form/Form";

function validatePrimeNumber(number) {
  if (number === 11) {
    return {
      validateStatus: "success",
      errorMsg: null,
    };
  }

  return {
    validateStatus: "error",
    errorMsg: "The prime between 8 and 12 is 11!",
  };
}

const formItemLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 12,
  },
};

const RawForm = () => {
  const [number, setNumber] = useState({
    value: 11,
  });
  const tips = "A prime is a natural number greater than 1 that has no positive divisors other than 1 and itself.";

  const onNumberChange = (value) => {
    setNumber({ ...validatePrimeNumber(value), value });
  };
  const [form] = useForm();
  function onFinish(values) {
    console.log("values:", values);
    console.log(form.getFieldValue("username"));
    console.log(form.getFieldValue("gender"));
  }
  function onFinishFailed(errorInfo) {
    console.log("errorInfo:", errorInfo);
  }
  return (
    <Form>
      <Form.Item
        {...formItemLayout}
        label="Prime between 8 & 12"
        name="xx"
        rules={[
          {
            validator: (_, value, callback) => {
              console.log(value);
              return new Promise((resolve, reject) => {
                console.log(value);
                if (value === 11) {
                  resolve("我就要这个值");
                } else {
                  reject("值都错了 你个废物");
                }
              });
            },
          },
        ]}
        // valuePropName="checked"
        validateTrigger="onChange"

        // validateStatus={number.validateStatus}
        // help={number.errorMsg || tips}
      >
        {/* value={number.value} onChange={onNumberChange} */}
        <InputNumber
          min={8}
          max={12}
          onChange={() => {
            console.log(111);
          }}
        />
        {/* <Checkbox>请仔细阅读协议内容</Checkbox> */}
      </Form.Item>
    </Form>
  );
};

export default RawForm;

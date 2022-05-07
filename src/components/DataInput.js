import ClearOutlined from "@ant-design/icons/ClearOutlined";
import SmileOutlined from "@ant-design/icons/SmileOutlined";
import TrademarkOutlined from "@ant-design/icons/TrademarkOutlined";
import UserOutlined from "@ant-design/icons/UserOutlined";
import { AutoComplete, Button, Cascader, Checkbox, Divider, Input, InputNumber, Radio, Select, Slider, Space, Switch, TreeSelect, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
const { Title } = Typography;
const { TreeNode } = TreeSelect;
function DataInput() {
  const { Option } = Select;
  const { Search } = Input;

  const options = [
    {
      value: "zhejiang",
      label: "Zhejiang",
      children: [
        {
          value: "hangzhou",
          label: "Hangzhou",
          children: [
            {
              value: "xihu",
              label: "West Lake",
            },
          ],
        },
      ],
    },
    {
      value: "jiangsu",
      label: "Jiangsu",
      children: [
        {
          value: "nanjing",
          label: "Nanjing",
          children: [
            {
              value: "zhonghuamen",
              label: "Zhong Hua Men",
            },
          ],
        },
      ],
    },
  ];
  // children: [
  //   {
  //     value: "hangzhou",
  //     label: "Hangzhou",
  //     children: [
  //       {
  //         value: "xihu",
  //         label: "West Lake",
  //       },
  //     ],
  //   },
  // ],

  const selectBefore = (
    <Select defaultValue="http://" className="select-before">
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );
  const [asyncOptions] = useState([
    {
      value: "zhejiang",
      label: "Zhejiang",
      isLeaf: false,
    },
    {
      value: "jiangsu",
      label: "Jiangsu",
      isLeaf: false,
    },
  ]);
  function loadData(selectedOptions) {
    console.log(selectedOptions);
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
  }

  const [sliderValue, setSliderValue] = useState(20);

  const checkBoxOptions = [
    { label: "Apple", value: "Apweeple" },
    { label: "Pear", value: "xxxear", disabled: true },
    { label: "Orange", value: "Oxxxrange" },
  ];
  const [switchState, setSwitchState] = useState(false);
  const [result, setResult] = useState([]);
  const ref = useRef(null);
  useEffect(() => {
    ref.current = switchState;
  }, [switchState]);
  return (
    <div>
      <Title level={5}>输入框组件</Title>
      <ol>
        <li>原生的input根据type分为不同的类型主要包括text button radio(单选) checkbox(多选) file password </li>
        <li>在封装之后, radio checkbox 自成组件</li>
        <li>input组件本身得到增强，在支持type属性的情况下，还得到了 search textarea group和password等4个增强的子组件</li>
        <li>Input是对原生input进行了增强，原生input可接受的属性, Input都可以使用，例如radio (Input type="radio" name="sex" )</li>
        <li>input支持前缀和后缀图标(input框内)prefix 主要用来添加单位的表示符,还有清除内容的小叉子,以及密码框的小眼睛</li>
        <li>input还支持前缀和后缀标签(input框外)addonBefore,更强大</li>
        <li>input组件本身并不是很强大，让我们查看 Input.Search在Input的基础上添加的新的功能</li>
        <li>search默认携带一个搜索的addonafter, 支持onSearch本质就是addon的click，还可以设置loading状态</li>
        <li>password默认配置即可，默认携带了一个小眼睛，负责显示和隐藏</li>
      </ol>
      <Space direction="vertical" size="large">
        <Input prefix={<SmileOutlined />} suffix={<UserOutlined />} addonBefore={selectBefore} addonAfter={<TrademarkOutlined />} />
        <Input defaultValue="26888888" allowClear />
        <Input defaultValue="222" bordered={false} />
        <Input defaultValue="222" disabled />

        <Input
          placeholder="自定义了一个清除value的按钮"
          addonAfter={
            <div
              onClick={(e) => {
                const input = e.currentTarget.parentNode.previousSibling;
                input.value = "";
                console.log("自定义的search事件");
              }}
            >
              <ClearOutlined />
            </div>
          }
        />

        <Search
          //   enterButton
          onSearch={() => {
            console.log("onsearch");
          }}
          onChange={() => {
            console.log("onchange");
          }}
          onPressEnter={() => {
            console.log("on press enter");
          }}
        />
        <Input.Password />
      </Space>
      <Divider />
      <Title level={5}>单选控件radio</Title>
      <ol>
        <li>radio和普通的select是一样的，支持单选</li>
        <li>但是radio是所有项目可见，所以不适用于特别多项</li>
        <li>原生的input type="radio" 是通过name属性形成一组radio的互斥，现在是通过把radio放在一组radio.group中,name属性可加可不加，建议加</li>
        <li>可以使用不同的radio样式，原来是一个圆，现在支持一个button</li>
      </ol>
      <Radio.Group
        onChange={(e) => {
          console.log("e:", e);
        }}
        name="answer"
        defaultValue={3}
      >
        <Radio value={1}>A</Radio>
        <Radio value={2}>B</Radio>
        <Radio value={3}>C</Radio>
        <Radio value={4}>D</Radio>
      </Radio.Group>
      <Radio.Group>
        <Radio.Button value={1}>A</Radio.Button>
        <Radio value={2}>B</Radio>
        <Radio.Button value={3}>C</Radio.Button>
        <Radio.Button value={4}>D</Radio.Button>
      </Radio.Group>
      <Divider />
      <Title level={5}>Checkbox多选框</Title>
      <ol>
        <li>在一组项目中，主要作用是标记一个项目是否选中，和提交操作关系紧密</li>
      </ol>
      <input type="checkbox" value="10" disabled /> 10 <br />
      <Checkbox>10</Checkbox>
      <br />
      <Divider orientation="left" plain>
        checkbox group展示
      </Divider>
      <Checkbox.Group
        options={checkBoxOptions}
        defaultValue={["Apple"]}
        onChange={function onChange(checkedValues) {
          console.log("checked = ", checkedValues);
        }}
      />
      <Divider />
      <Title level={5}>开关组件 Switch</Title>
      <ol>
        <li>开关组件用来切换两个状态，是带状态的，和单个的受控checkbox效果一致</li>
        <li>switch主要是直接触发状态改变，而checkbox默认是没有状态的，需要受控之后添加状态，主要是标记信息，并和提交操作配合</li>
      </ol>
      <Switch
        checkedChildren="开启"
        unCheckedChildren="未开启"
        autoFocus
        defaultChecked
        onChange={(value) => {
          console.log("value:", value);
          setSwitchState(value);
          setTimeout(() => {
            if (ref.current) {
              setSwitchState(!ref.current);
            }
          }, 2000);
        }}
        loading={switchState ? true : false}
      />
      <Divider />
      <Title level={5}>Select选择器</Title>
      <ol>
        <li>用于增强原生的select，当可选项目少于5个的时候，推荐使用radio</li>
        <li>select添加了搜索功能,有默认的filterOption，会针对输入内容去筛选option并显示</li>
        <li>每一个option都有label和value，选中后，可以配置显示label还是value</li>
        <li>单选模式下，需要设置allowclear用于清除选择</li>
        <li>mode在不设置的时候是单选，设置multiple可以多选，设置为tags之后，不仅有multiple的功能,可以自己输入内容并创建选项</li>
        <li>option可以像menu中的ItemGroup进行分组</li>
        <li>通过两个select标签，可以实现联动，但是效果不如cascader组件自然</li>
        <li>支持搜索并加载远程数据，通过事件动态添加数据</li>
        <li>默认当选中之后，在onchange事件中只能拿到value，如果也想拿label需要激活labelInValue属性</li>
        <li style={{ color: "red" }}>dropdownrender提供了动态添加option的功能</li>
        <li>当select中可选项太多，select已经默认启动了虚拟列表的功能，只渲染视图内的元素</li>
      </ol>
      <Select defaultValue="lucy" style={{ width: 120 }} showSearch allowClear filterOption={false} onChange={() => {}}>
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="disabled" disabled>
          Disabled
        </Option>
        <Option value="Yiminghe">yiminghe</Option>
      </Select>
      <Select defaultValue="lucy" style={{ width: 120 }} mode="multiple" onChange={() => {}}>
        <Option value="disabled" disabled>
          Disabled
        </Option>
        <Option value="lucy">Lucy</Option>
        <Option value="Yiminghe">yiminghe</Option>
        <Option value="jack">Jack</Option>
      </Select>
      <Select defaultValue="lucy" style={{ width: 120 }} mode="tags" onChange={() => {}}>
        <Option value="disabled" disabled>
          Disabled
        </Option>
        <Option value="lucy">Lucy</Option>
        <Option value="Yiminghe">yiminghe</Option>
        <Option value="jack">Jack</Option>
      </Select>
      <Divider />
      <Title level={5}>Cascader级联选择器</Title>
      <ol>
        <li>级联选择器，顾名思义，在选择完一个之后，第二个阶段的select才会出现</li>
        <li>Cascader也只是一个容器，提供了级联选择的功能，如果没有children有默认的input形式，我们也可以传递一个button作为触发的元素</li>
        <li>可以自定义禁用，触发下一级的trigger方式，hover或者click</li>
        <li>支持当前渲染内容的搜索，但是不支持像select一样的服务器端搜索</li>
        <li>和树型空间一样，支持异步加载数据，在选择一项之后采取加载对应数据</li>
        <li>使用异步加载的时候，数据格式有要求，除了label和value还需要指明isLeaf</li>
      </ol>
      <Cascader options={options} onChange={() => {}} placeholder="Please select" />
      <Cascader options={options} onChange={() => {}} placeholder="Please select">
        <Button type="primary">级联选择器按钮</Button>
      </Cascader>
      <Cascader options={asyncOptions} loadData={loadData} placeholder="Please select" />
      <Divider />
      <Title level={5}>treeSelect</Title>
      <ol>
        <li>介绍了select和级联select，然后是树型select</li>
        <li>treeSelect和tree的区别在于，他依然是select的表现形式，给了一个input框，点击之后才会弹出一个tree</li>
        <li>如果不同选项有父子层级关系就是treeselect，否则就是select</li>
        <li>和tree组件不同，不支持oncheck，但是有onselect和onexpand,并且多出了 onchange和onsearch，他们都是文本值修改触发的回调</li>
      </ol>
      <TreeSelect
        showSearch
        style={{ width: "50%" }}
        // dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
        placeholder="Please select"
        allowClear
        multiple
        onChange={(value, label, extra) => {
          console.log("onchange", value);
          console.log("onchange", label);
          console.log("onchange", extra);
        }}
        onSelect={(value) => {
          console.log("onSelect", value);
        }}
      >
        <TreeNode value="parent 1" title="parent 1">
          <TreeNode value="parent 1-0" title="parent 1-0">
            <TreeNode value="leaf1" title="my leaf" />
            <TreeNode value="leaf2" title="your leaf" />
          </TreeNode>
          <TreeNode value="parent 1-1" title="parent 1-1">
            <TreeNode value="sss" title={<b style={{ color: "#08c" }}>sss</b>} />
          </TreeNode>
        </TreeNode>
      </TreeSelect>
      <Divider />
      <Title level={5}>输入框自动完成autocomplete</Title>
      <ol>
        <li>输入主要分为input和select，这两种方式都可以在输入之后，弹出提示框</li>
        <li style={{ color: "red" }}>主要目的是辅助输入，例如输入邮箱，自动添加后缀，</li>
        <li>他和select的区别在于 select是在外界提供的有限的项目中选择一个,不管是提前加载好的还是远程拉去的结果</li>
        <li>autocomplte重点在于自己的输入，和外界提供无关，他只负责帮我辅助快速生成我想要的数据</li>
      </ol>
      <AutoComplete
        // options={autocomplteOptions}
        style={{ width: 200 }}
        onSelect={(value) => {
          console.log("onSelect");
          console.log("selected value:", value);
        }}
        onSearch={(value) => {
          console.log("onSearch");
          console.log("value:", value);
          let res = [];
          if (!value || value.indexOf("@") >= 0) {
            res = [];
          } else {
            res = ["gmail.com", "163.com", "qq.com"].map((domain) => `${value}@${domain}`);
          }
          setResult(res);
        }}
        onChange={(value, option) => {
          console.log("onChange");
          console.log("value:", value);
          console.log("option:", option);
        }}
        placeholder="input here"
      >
        {result.map((email) => (
          <Option key={email} value={email}>
            {email}
          </Option>
        ))}
      </AutoComplete>
      <Divider />
      <Title level={5}>滑块</Title>
      <ol>
        <li>本质是由外层div包裹了内层的5个div，包括rail轨道，track已经划过的轨迹，step步长，handle就是小圆点，mark</li>
        <li>可以控制滑块的数量，范围，方向以及onchange事件</li>
        <li>可以添加标记点</li>
      </ol>
      <Slider
        min={0}
        max={100}
        tooltipVisible
        dots
        value={sliderValue}
        marks={{ 20: "first", 30: "second" }}
        onChange={(value) => {
          setSliderValue(value);
        }}
      />
      <InputNumber
        value={sliderValue}
        onChange={(value) => {
          setSliderValue(value);
        }}
      />
      <Divider />
    </div>
  );
}

export default DataInput;

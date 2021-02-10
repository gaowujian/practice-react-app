import React, { useState } from "react";
import { Typography, Divider, Table, Tag, Space, Button } from "antd";
const { Title } = Typography;
function AntdTable() {
  const [sortOrder, setSortOrder] = useState("descend");

  const renderContent = (value, row, index) => {
    console.log("value:", value);
    console.log("row:", row);
    console.log("index:", index);
    const obj = {
      children: value,
      props: {},
    };
    if (index === 1) {
      obj.props.rowSpan = 2;
    }
    if (index === 2) {
      obj.props.colSpan = 0;
      obj.props.rowSpan = 0;
    }

    return obj;
  };
  // columns定义了每一列的数据应该有什么操作
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      sorter: (a, b) => {
        // a,b指的是两行，比较数据还是需要比较dataIndex所指定的数据
        return a.name.length - b.name.length;
      },
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Jim",
          value: "Jim",
        },
      ],
      onFilter: (value, record) => {
        console.log(record);
        return record.name.indexOf(value) === 0;
      },
      sortDirections: ["ascend"],
      render: (value, row, index) => {
        console.log("value:", value);
        console.log("row:", row);
        console.log("index:", index);
        const obj = {
          children: value,
          props: {},
        };

        if (index === 1) {
          obj.props.rowSpan = 2;
        }
        if (index === 2) {
          obj.props.colSpan = 3;
          obj.props.rowSpan = 0;
        }

        return obj;
      },
    },
    {
      title: "Age",
      dataIndex: "age",
      sorter: (a, b) => {
        // a,b指的是两行，比较数据还是需要比较dataIndex所指定的数据
        return a.age - b.age;
      },
      //   defaultSortOrder: "ascend",
      //   sortDirections: ["ascend", "descend"],
      sortOrder: sortOrder,
      key: "age",
      render: renderContent,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",

      render: renderContent,
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",

      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",

      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  //   data定义了每一行的数据
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
      children: [
        {
          key: 11,
          name: "John Brown",
          age: 42,
          address: "",
          tags: [],
          children: [
            {
              key: 11,
              name: "John Brown",
              age: 42,
              address: "",
              tags: [],
            },
          ],
        },
      ],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];
  function handleSelectedKeysChange(selectedRowKeys) {
    setSelectedRowKeys(selectedRowKeys);
  }
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const rowSelection = { type: "checkbox", selectedRowKeys: selectedRowKeys, onChange: handleSelectedKeysChange, selections: true };

  //   分页，排序和筛选变化时都会触发
  const handleChange = (pagination, filters, sorter) => {
    console.log("pagination:", pagination);
    console.log("filters:", filters);
    console.log("sorter:", sorter);
    // if (sortOrder === "descend") {
    //   setSortOrder("ascend");
    // } else {
    //   setSortOrder("descend");
    // }
  };
  console.log("render");

  return (
    <div>
      <Title level={5}>表格组件</Title>
      <ol>
        <li>如果有大量的结构化数据需要展示，如果只是展示可读数据，可以考虑使用Descriptions</li>
        <li>如果对数据有排序，搜索分页和自定义的复杂操作</li>
        <li>行选中rowSelection是一个非常重要的操作，通过配置type可以决定是单选还是多选,自定义快捷选中规则，默认有全选，全不选</li>
        <li>filter可以用来筛选数据条件,onFilter函数定义筛选逻辑</li>
        <li>sorter函数指定后默认支持排序，sortDirections的默认值是[ascend, descend]，支持双向排序，如果只支持单向自己配置一下,defaultSortOrder用来配置是否开始默认的排序，否则数据按输入进行显示</li>
        <li>一个列表中默认只有一个排序方式，如果有多个排序需要指定优先级，sorter不再是一个函数,sorter.compare是排序逻辑,sorter.multiple是优先级,值越大优先级越高</li>
        <li>sortOrder属性可以让table组件受控,可以用来修改排序，并重新render</li>
        <li>如果一个的修改只会影响自己的显示，那么受控和受控差距不大，但是当一个属性的改变需要引起其他人的变化就需要让其受控</li>
        <li>不配置sortOrder属性的时候，也可以实现内容的排序，同时不会引起重新render</li>
        <li>column接受render属性用于自定义渲染，函数接受 text当前行的值 row指的是当前行的信息，包含其他列 以及index当前行的索引为参数信息 </li>
        <li>表头只支持列合并不支持行合并，表格单元支持行合并和列合并</li>
        <li>table支持树形结构数据的展示，但是操作的话，还是推荐树形组件更方便，有选中，展开等操作事件</li>
        <li>配置table的scroll属性，可以控制固定表头</li>
      </ol>
      <Button disabled={selectedRowKeys.length === 0 ? true : false}>load</Button>
      <Button
        onClick={() => {
          if (sortOrder === "descend") {
            setSortOrder("ascend");
          } else {
            setSortOrder("descend");
          }
        }}
      >
        Age Sort
      </Button>
      <Table scroll={{ x: 500, y: 200 }} columns={columns} indentSize={20} dataSource={data} bordered={false} rowSelection={rowSelection} onChange={handleChange} />
    </div>
  );
}

export default AntdTable;

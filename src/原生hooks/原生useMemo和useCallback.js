import React from "react";
import ReactDOM from "react-dom";

import { Fragment } from "react";
import { useState, memo } from "react";
import { useMemo } from "react";
import { useCallback } from "react";

function Child(props) {
  const { data, addClick } = props;
  console.log("child render");
  return (
    <div>
      <button onClick={addClick}>{data.number}</button>
    </div>
  );
}
// 如果属性不变就不渲染，如果变了就渲染
Child = memo(Child);
// 为了实现优化，让组件减少渲染，在使用memo的基础之上，使用useMemo,useCallback
let lastAddClick;
let lastData;
function App() {
  const [number, setNumber] = useState(0);
  const [name, setName] = useState("zhufeng");
  // 优化函数
  // let addClick = () => setNumber(number + 1);

  let addClick = useCallback(() => {
    setNumber(number + 1);
  }, [number]);

  console.log("App -> lastAddClick = addClick", lastAddClick === addClick);
  lastAddClick = addClick;
  // let data = { number };
  //  优化变量值
  let data = useMemo(() => {
    return { number };
  }, [number]);

  console.log("App -> lastData = data", lastData === data);
  lastData = data;
  return (
    <Fragment>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <Child data={data} addClick={addClick} />
    </Fragment>
  );
}

function render() {
  ReactDOM.render(<App />, document.getElementById("root"));
}

render();

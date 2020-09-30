import React from "react";
import ReactDOM from "react-dom";

import { Fragment } from "react";
import { memo } from "react";
// import { useState } from "react";

let lastStates = [];
let index = 0;
function useState(initial) {
  let lastState = lastStates[index] || initial;
  function setNumber(number) {
    lastState = number;
    render();
  }
  return [lastStates[index++], setNumber];
}

let lastCallback;
let lastCallbackDependencies;

function useCallback(callback, dependencies) {
  // 如果依赖存在，需要对依赖进行一次浅比较，如果没有说明是第一次，直接赋值并返回
  // 对比当前依赖项dependencies和lastCallbackDependencies
  if (lastCallbackDependencies) {
    let changed = !dependencies.every((item, index) => {
      return item === lastCallbackDependencies[index];
    });
    // 如果变化了，对属性进行重新赋值，渲染的时候因为属性变化就会重新渲染
    if (changed) {
      lastCallback = callback;
      lastCallbackDependencies = dependencies;
    }
  } else {
    // 第一次渲染的时候
    lastCallback = callback;
    lastCallbackDependencies = dependencies;
  }
  return lastCallback;
}

let lastMemo;
let lastMemoDependencies;
function useMemo(callback, dependencies) {
  // 如果依赖存在，需要对依赖进行一次浅比较，如果没有说明是第一次，直接赋值并返回
  // 对比当前依赖项dependencies和lastMemoDependencies
  if (lastMemoDependencies) {
    let changed = !dependencies.every((item, index) => {
      return item === lastMemoDependencies[index];
    });
    // 如果变化了，对属性进行重新赋值，渲染的时候因为属性变化就会重新渲染
    if (changed) {
      lastMemo = callback();
      lastMemoDependencies = dependencies;
    }
  } else {
    // 第一次渲染的时候,记录结果而不是引用

    lastMemo = callback();
    lastMemoDependencies = dependencies;
  }
  return lastMemo;
}

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

import React from "react";
import {
  // useMount,
  // useUnmount,
  // useUnmountedRef,
  useUpdateEffect,
  useUpdateLayoutEffect,
} from "ahooks";

import { useEffect } from "react";
import { useReducer } from "react";
import { useState } from "react";
import { useUnmountedRef, useMount, useMemorizedFn, useUnmount } from "./hooks";
import { useCallback } from "react";

const style = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
function Child() {
  useMount(() => {
    console.log("挂载的时候，需要执行的函数");
  });

  useUpdateLayoutEffect(() => {
    console.log("只在更新的时候，执行useUpdateLayoutEffect");
  });

  console.log("render函数");

  useEffect(() => {
    console.log("挂载和更新的时候，执行useEffect");
  });
  useUpdateEffect(() => {
    console.log("只在更新的时候，执行useUpdateEffect");
  });
  useUnmount(() => {
    console.log("卸载的时候，需要执行的函数");
  });
  // const unmountedRef = useUnmountedRef();
  // console.log("unmountedRef.current:", unmountedRef.current);
  // useEffect(() => {
  //   setTimeout(() => {
  //     if (!unmountedRef.current) {
  //       alert("当前组件是存在状态");
  //     } else {
  //       alert("已经卸载了，不能异步设置state");
  //     }
  //   }, 3000);
  // }, [unmountedRef]);
  return <span>子组件</span>;
}
let last;
let showNum;
function App() {
  const [num, forceUpdate] = useReducer((count) => count + 1, 0);

  const [childVisible, setChildVisible] = useState(false);

  const showNum = useMemorizedFn(function () {
    alert(num);
  });

  return (
    <div style={style}>
      {childVisible && <Child />}
      <div>counter计数器:{num}</div>
      <button onClick={showNum}>展示数字</button>
      <button onClick={forceUpdate}>强制更新</button>
      <button
        onClick={() => {
          setChildVisible(!childVisible);
        }}
      >
        子组件状态:{childVisible ? "mount" : "unmount"}
      </button>
    </div>
  );
}

export default App;

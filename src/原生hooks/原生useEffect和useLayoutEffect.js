import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

// useEffect是一个钩子，函数会在渲染之后执行
// 主要应用场景是 副作用, 改变dom，发起请求，打印日志
function Counter() {
  const [name, setName] = useState("zhufeng");
  const [number, setNumber] = useState(0);
  console.log("inner number", number);
  const ref = useRef();
  const style = {
    width: "200px",
    height: "200px",
    backgroundColor: "red",
  };
  // console.log("inner number", number);
  // useEffect(() => {
  //   console.log("effect number", number);
  // }, [number]);

  useEffect(() => {
    console.log("effect渲染后执行");
    // 死循环也不会影响初次渲染
    // while (true) {}
    if (ref.current) {
      ref.current.style.transform = "translate(500px)";
      ref.current.style.transition = "all 1s";
    }
  });
  useLayoutEffect(() => {
    console.log("layouteffect 渲染前执行");
    // 如果死循环就不会渲染页面
    // while (true) {}
  });
  console.log("render");
  return (
    <div>
      <p>{name}</p>
      <p>{number}</p>
      <button
        onClick={() => {
          setName(Date.now());
        }}
      >
        修改名称
      </button>
      <button
        onClick={() => {
          setNumber(number + 1);
        }}
      >
        修改数字
      </button>
      <div className="box" ref={ref} style={style}>
        内容
      </div>
    </div>
  );
}

function render() {
  ReactDOM.render(<Counter />, document.getElementById("root"));
}

render();

import React, { useRef } from "react";
import ReactDOM from "react-dom";

let lastEffectDependencies;
function useEffect(callback, dependencies) {
  if (lastEffectDependencies) {
    let changed = !dependencies.every((item, index) => {
      return item === lastEffectDependencies[index];
    });
    if (changed) {
      setTimeout(callback);
      lastEffectDependencies = dependencies;
    }
  } else {
    setTimeout(callback);
    lastEffectDependencies = dependencies;
  }
}

let lastLayoutEffectDependencies;
function useLayoutEffect(callback, dependencies) {
  if (lastLayoutEffectDependencies) {
    let changed = !dependencies.every((item, index) => {
      return item === lastLayoutEffectDependencies[index];
    });
    if (changed) {
      Promise.resolve().then(callback);
      lastLayoutEffectDependencies = dependencies;
    }
  } else {
    Promise.resolve().then(callback);
    lastLayoutEffectDependencies = dependencies;
  }
}

// useEffect是一个钩子，函数会在渲染之后执行
// 主要应用场景是 副作用, 改变dom，发起请求，打印日志
function Counter() {
  const ref = useRef();
  const style = {
    width: "200px",
    height: "200px",
    backgroundColor: "red",
  };

  useEffect(() => {
    console.log("useEffect");
    ref.current.style.transform = "translate(300px)";
    ref.current.style.transition = "all 1s";
  });

  useLayoutEffect(() => {
    console.log("useLayoutEffect");
    ref.current.style.transform = "translate(500px)";
    ref.current.style.transition = "all 1s";
  });

  console.log("render");
  return (
    <div>
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

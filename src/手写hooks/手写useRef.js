import React, { useLayoutEffect, useEffect } from "react";
import ReactDOM from "react-dom";

let lastRef;
function useRef(initialRef) {
  lastRef = lastRef || initialRef;
  return {
    current: lastRef,
  };
}

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

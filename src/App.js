import React, { useMemo } from "react";
import "./style.css";

function App() {
  const mouseEventManager = useMemo(() => {
    return {
      onClick: function (e) {
        console.log(`${e.currentTarget.id}触发了click`);
      },
      onMouseDown: function (e) {
        console.log(`${e.currentTarget.id}触发了onMouseDown`);
      },
      onMouseUp: function (e) {
        console.log(`${e.currentTarget.id}触发了onMouseUp`);
      },
    };
  }, []);
  return (
    <div id="parent" {...mouseEventManager}>
      父元素
      <div id="child" {...mouseEventManager}>
        子元素
      </div>
    </div>
  );
}

export default App;

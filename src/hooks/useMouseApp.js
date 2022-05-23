import React from "react";
import useMouse from "./useMouse";

const App = () => {
  const mousePos = useMouse();
  return (
    <div>
      <h1>显示鼠标的移动坐标信息</h1>
      <p>{JSON.stringify(mousePos)}</p>
    </div>
  );
};
export default App;

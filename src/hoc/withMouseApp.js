import React from "react";
import withMouse from "./withMouse";

const App = (props) => {
  return (
    <div>
      <h1>显示鼠标的移动坐标信息</h1>
      <p>{JSON.stringify(props.mousePos)}</p>
    </div>
  );
};
export default withMouse(App);

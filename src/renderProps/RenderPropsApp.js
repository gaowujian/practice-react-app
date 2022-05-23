import React, { useEffect, useState } from "react";
import MouseComp from "./MouseComp";

const App = () => {
  return (
    <div>
      <h1>显示鼠标的移动坐标信息</h1>
      <MouseComp
        render={(mousePos) => {
          return <p>{JSON.stringify(mousePos)}</p>;
        }}
      />
    </div>
  );
};
export default App;

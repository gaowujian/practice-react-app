import React, { useEffect, useRef, useState } from "react";
import useCountDown from "./hooks/useCountDown";

let last;
const App = () => {
  const [count, startCount] = useCountDown({ initial: 5 });
  console.log("last===count:", last === startCount);
  last = startCount;
  return (
    <div>
      <p>{count}</p>
      <button onClick={startCount}>开始</button>
    </div>
  );
};
export default App;

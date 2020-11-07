import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  console.log("render函数:count", count);
  // useEffect中读取到的状态是老状态
  useEffect(() => {
    // const id = setTimeout(() => {
    //   setCount((c) => {
    //     console.log("count值:", c);
    //     return c + step;
    //   });
    //   console.log("当次渲染的step值:", step);
    // }, 1000);
    // return () => clearTimeout(id);
    setCount((c) => {
      console.log("useEffect中count值:", c);
      return c + step;
    });
  }, [step]);

  return (
    <>
      <h1>{count}</h1>
      <input value={step} onChange={(e) => setStep(Number(e.target.value))} />
    </>
  );
}
ReactDOM.render(<Counter />, document.getElementById("root"));

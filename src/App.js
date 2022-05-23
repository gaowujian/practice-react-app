import React, { useEffect, useRef, useState, useCallback } from "react";
// import useCountDown from "./hooks/useCountDown";

function useCountDown(options = {}) {
  const initial = options.initial || 10;
  const [count, setCount] = useState(initial);

  const reset = useCallback(() => {
    setCount(initial);
  }, [initial]);

  //  ! planA
  // const ref = useRef(count);
  // ref.current = count;
  // const startCount = useCallback(() => {
  //   const interval = setInterval(() => {
  //     if (ref.current !== 0) {
  //       setCount(ref.current - 1);
  //     } else {
  //       clearInterval(interval);
  //       reset();
  //     }
  //   }, 1000);
  // }, [reset]);

  //  ! planB
  const isMounted = useRef(false);
  const startCount = function () {
    setCount(count - 1);
  };
  useEffect(() => {
    let interval;

    // 1.count值大于0并且已经挂载后才会执行更新
    // 2.重置回初始值的时候不会继续更新
    if (count > 0 && isMounted.current && count !== initial) {
      interval = setInterval(() => {
        setCount(count - 1);
      }, 1000);
    }
    // 执行完自动重置
    if (count <= 0) {
      reset();
    }

    return () => {
      if (!isMounted.current) {
        isMounted.current = true;
      }
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [count, initial, reset]);

  return [count, startCount];
}
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

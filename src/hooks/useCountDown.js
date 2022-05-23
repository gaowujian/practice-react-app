import React, { useCallback, useEffect, useRef, useState } from "react";

function useCountDown(options = {}) {
  const initial = options.initial || 10;
  const [count, setCount] = useState(initial);
  const isMounted = useRef(false);

  const reset = useCallback(() => {
    setCount(initial);
  }, [initial]);

  //   planB
  //   const startCount = function () {
  //     setCount(count - 1);
  //   };
  //   useEffect(() => {
  //     let interval;

  //     if (count > 0 && count !== initial && isMounted.current) {
  //       interval = setInterval(() => {
  //         setCount(count - 1);
  //       }, 1000);
  //     } else {
  //       // 执行完自动重置
  //       reset();
  //     }

  //     return () => {
  //       if (!isMounted.current) {
  //         isMounted.current = true;
  //       }
  //       if (interval) {
  //         clearInterval(interval);
  //       }
  //     };
  //   }, [count, initial, reset]);

  //   planA
  const ref = useRef(count);
  ref.current = count;
  const startCount = useCallback(() => {
    const interval = setInterval(() => {
      if (ref.current !== 0) {
        setCount(ref.current - 1);
      } else {
        clearInterval(interval);
        reset();
      }
    }, 1000);
  }, [reset]);

  return [count, startCount];
}

export default useCountDown;

import { useMemo } from "react";
import { useRef } from "react";

// 可以反应一个组件是否卸载，卸载了为true，没有卸载是false
function useMemorizedFn(fn) {
  const memorizedFnRef = useRef(fn);
  // todo为什么不是用如下
  // ref.current = fn;

  memorizedFnRef.current = useMemo(() => fn, [fn]);

  return function (...args) {
    memorizedFnRef.current(...args);
  };
}

export default useMemorizedFn;

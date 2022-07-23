import { useMemo } from "react";
import { useRef } from "react";

// 1. 确保该hook返回的函数在多次渲染的过程中保持同一引用

function useMemorizedFn(fn) {
  // 我们用ref来缓存一个最新的fn
  const latestFnRef = useRef(fn);
  // todo为什么不是用如下
  // ref.current = fn;
  latestFnRef.current = useMemo(() => fn, [fn]);

  // 第一种方式 useRef创建一个 memorizedFnRef 来缓存一个地址不变的函数
  const memorizedFnRef = useRef();

  if (!memorizedFnRef.current) {
    memorizedFnRef.current = function (...args) {
      latestFnRef.current(...args);
      // fn(...args);
    };
  }
  return memorizedFnRef.current;

  // 第二种方式 ，使用空依赖的useCallback 来缓存一个地址不变的函数
  // return useCallback((...args) => {
  //   latestFnRef.current(...args);
  // }, []);
}

export default useMemorizedFn;

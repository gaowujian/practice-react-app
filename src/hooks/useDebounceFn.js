import { useCallback, useMemo } from "react";
import useMemorizedFn from "./useMemorizedFn";

// ! 自己实现的第一版
/* eslint-disable*/
function useDebounceFn(fn, options = { wait: 1000 }) {
  const memoFn = useMemorizedFn(fn);

  const debouncedResult = useCallback(
    debounce(memoFn, options.wait, options),
    []
  );

  // const debouncedResult = useCallback(
  //   () => debounce(memoFn, options.wait, options),
  //   []
  // );
  return debouncedResult;
}

function debounce(fn, ms) {
  let timeout;
  return {
    run: function (...args) {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        fn(...args);
      }, ms);
    },
    cancel: function () {
      if (timeout) {
        clearTimeout(timeout);
      }
    },
    flush: function () {
      if (timeout) {
        clearTimeout(timeout);
      }
      fn();
    },
  };
}

export default useDebounceFn;

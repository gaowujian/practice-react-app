import React from "react";
import { useMemo } from "react";
import { useState } from "react";

// * 优化的点
// 1. 多多使用 useState的函数模式，可以简化代码
function useToggle(defaultValue = false, defaultReverseValue) {
  const [state, setState] = useState(defaultValue);
  const reverseValue =
    typeof defaultReverseValue === "undefined"
      ? !defaultValue
      : defaultReverseValue;

  const actions = useMemo(() => {
    return {
      toggle: function () {
        setState((prev) => {
          return prev === defaultValue ? reverseValue : defaultValue;
        });
      },
      set: function (val) {
        setState(val);
      },
      setLeft: function () {
        setState(defaultValue);
      },
      setRight: function () {
        setState(reverseValue);
      },
    };

    // [defaultValue, reverseValue] 优化，不支持动态修改值
    // eslint-disable-next-line
  }, []);

  return [state, actions];
}

export default useToggle;

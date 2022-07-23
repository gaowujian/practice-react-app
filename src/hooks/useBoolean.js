import React from "react";
import { useMemo } from "react";
import { useState } from "react";
import useMemorizedFn from "./useMemorizedFn";

// !!  初始版
function useBooleanA(defaultValue) {
  const [state, setState] = useState(defaultValue);
  const obj = {
    toggle: function () {
      setState(!state);
    },
    set: function (val) {
      setState(val);
    },
    setTrue: function () {
      setState(true);
    },
    setFalse: function () {
      setState(false);
    },
  };
  return [state, obj];
}
// * 优化之后
// 1. 使用useMemo

/* eslint-disable*/
function useBoolean(defaultValue) {
  const [state, setState] = useState(defaultValue);
  const toggle = useMemorizedFn(function () {
    setState(!state);
  });
  const obj = useMemo(() => {
    return {
      toggle,
      set: function (val) {
        setState(val);
      },
      setTrue: function () {
        setState(true);
      },
      setFalse: function () {
        setState(false);
      },
    };
  }, []);
  return [state, obj];
}

export default useBoolean;

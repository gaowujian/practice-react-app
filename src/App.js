import React from "react";
import {
  // useMount,
  // useUnmount,
  // useUnmountedRef,
  useUpdateEffect,
  useUpdateLayoutEffect,
  // useSetState,
  // useMemoizedFn,
} from "ahooks";

import { useEffect } from "react";
import { useReducer } from "react";
import { useState } from "react";
import {
  useUnmountedRef,
  useMount,
  useUnmount,
  useMemoizedFn,
  useSetState,
} from "./hooks";
import { useCallback } from "react";

const App = () => {
  const [state, setState] = useSetState({
    hello: "",
    count: 0,
  });

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <p>
        <button type="button" onClick={() => setState({ hello: "world" })}>
          set hello
        </button>
        <button
          type="button"
          onClick={() => setState({ foo: "bar" })}
          style={{ margin: "0 8px" }}
        >
          set foo
        </button>
        <button
          type="button"
          onClick={() => setState((prev) => ({ count: prev.count + 1 }))}
        >
          count + 1
        </button>
      </p>
    </div>
  );
};
export default App;

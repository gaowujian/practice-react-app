import { useState } from "react";

// 行为的和 this.setState一直
// 1. 支持state的合并还不是替换
// 2. setState函数 支持传入对象和函数
function useSetState(initialState) {
  const [state, setState] = useState(initialState);

  function setMergeState(patch) {
    setState((prev) => {
      const patchState = typeof patch === "function" ? patch(prev) : patch;
      return patchState ? { ...prev, ...patchState } : prev;
    });
  }
  return [state, setMergeState];
}

// !! 自己的版本
// function useSetState(initialState) {
//     const [state, setState] = useState(initialState);

//     function newSetState(props) {
//       if (typeof props === "function") {
//         const result = props(state);
//         setState({
//           ...state,
//           ...result,
//         });
//       } else {
//         setState({
//           ...state,
//           ...props,
//         });
//       }
//     }
//     return [state, newSetState];
//   }

export default useSetState;

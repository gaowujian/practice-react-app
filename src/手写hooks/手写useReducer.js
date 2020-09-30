import React from "react";
import ReactDOM from "react-dom";
function reducer(state, action) {
  if (action.type === "add") {
    return { ...state, number: state.number + 1 };
  } else {
    return state;
  }
}

let lastState;
function useReducer(reducer, initialState) {
  lastState = lastState || initialState;
  function dispatch(action) {
    lastState = reducer(lastState, action);
    render();
  }
  return [lastState, dispatch];
}
let lastState11;
let lastDispatch;
function Counter() {
  const [state, dispatch] = useReducer(reducer, { number: 0 });
  console.log("lastState11===state", lastState11 === state);
  lastState11 = state;
  console.log("lastDispatch===dispatch", lastDispatch === dispatch);
  lastDispatch = dispatch;

  return (
    <div>
      <p>{state.number}</p>
      <button
        onClick={() => {
          dispatch({ type: "add" });
        }}
      >
        +
      </button>
    </div>
  );
}

function render() {
  ReactDOM.render(<Counter />, document.getElementById("root"));
}

render();

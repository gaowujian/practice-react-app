import React, { useReducer } from "react";
import ReactDOM from "react-dom";
function reducer(state, action) {
  if (action.type === "add") {
    return { ...state, number: state.number + 1 };
  } else {
    return state;
  }
}
function Counter() {
  const [state, dispatch] = useReducer(reducer, { number: 0 });
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

ReactDOM.render(<Counter />, document.getElementById("root"));

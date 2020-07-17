import React from "react";
import dva, { connect } from "./dva";

let app = dva();

app.model({
  namespace: "counter",
  state: { number: 20 },
  reducers: {
    add(state) {
      return { number: state.number + 1 };
    },
    minus(state) {
      return { number: state.number - 1 };
    },
  },
});

const Counter = connect((state) => state.counter)((props) => {
  return (
    <div>
      <p>{props.number}</p>
      <button
        onClick={() => {
          props.dispatch({ type: "counter/add" });
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          props.dispatch({ type: "counter/minus" });
        }}
      >
        -
      </button>
    </div>
  );
});

app.router(() => <Counter />);
app.start("#root");

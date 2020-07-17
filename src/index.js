import React from "react";
import dva, { connect } from "./dva";

let app = dva();

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
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
  effects: {
    *asyncAdd(action, { call, put }) {
      console.log("11");
      yield call(delay, 1000);
      console.log("22");
      yield put({ type: "counter/add" });
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
      <button
        onClick={() => {
          props.dispatch({ type: "counter/asyncAdd" });
        }}
      >
        +
      </button>
    </div>
  );
});

app.router(() => <Counter />);
app.start("#root");

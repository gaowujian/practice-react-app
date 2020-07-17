import React from "react";
import dva, { connect } from "dva";
import { Router, Route, Link } from "./dva/router";

let app = dva();
window.addEventListener("hashchange", () => {
  console.log("change");
});
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
      yield call(delay, 1000);
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

function Home() {
  return <div>我是主页</div>;
}

app.router(({ history }) => {
  console.log(history);
  return (
    <Router history={history}>
      <Link to="/">主页</Link>
      <br />
      <Link to="/counter">counter</Link>
      <Route path="/" exact component={Home} />
      <Route path="/counter" exact component={Counter} />
    </Router>
  );
});
app.start("#root");

import React from "react";
import ReactDOM from "react-dom";

import { Fragment } from "react";
let lastState;
function useState(initial) {
  lastState = lastState || initial;
  function setNumber(number) {
    lastState = number;
    render();
  }
  return [lastState, setNumber];
}
function App() {
  const [number, setNumber] = useState(0);
  return (
    <Fragment>
      <p>{number}</p>
      <button onClick={() => setNumber(number + 1)}>+1</button>
    </Fragment>
  );
}
function render() {
  ReactDOM.render(<App />, document.getElementById("root"));
}

render();

import React from "react";
import ReactDOM from "react-dom";

import { Fragment } from "react";
import { memo } from "react";
import { useMemo } from "react";
import { useCallback } from "react";
let lastStates = [];
let index = 0;
function useState(initial) {
  lastStates[index] = lastStates[index] || initial;
  let currentIndex = index;
  function setState(newState) {
    if (typeof newState === "function") {
      newState = newState(lastStates[index]);
    }
    lastStates[currentIndex] = newState;
    render();
  }

  return [lastStates[index++], setState];
}
function Child(props) {
  console.log("子组件渲染");
  const { number, setNumber } = props;
  return <button onClick={() => setNumber(number + 1)}>{number}</button>;
}
Child = memo(Child);
function Counter() {
  const [name, setName] = useState("name");
  let [number, setNumber] = useState(0);
  console.log(number);
  const data = useMemo(() => number, [number]);
  console.log(data);
  const addClick = useCallback(() => setNumber(number + 1), [number]);
  return (
    <Fragment>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <Child number={data} setNumber={addClick} />
    </Fragment>
  );
}

function render() {
  index = 0;
  ReactDOM.render(<Counter />, document.getElementById("root"));
}

render();

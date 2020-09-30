import React from "react";

import { useState } from "react";
import ReactDOM from "react-dom";

// 就一行代码，实现原理就是一个共享变量
function useContext(context) {
  return context._currentValue;
}

const AppContext = React.createContext();
function App() {
  const [state, setState] = useState({ number: 0 });
  return (
    <AppContext.Provider value={[state, setState]}>
      <div>
        <div>
          <Counter />
        </div>
      </div>
    </AppContext.Provider>
  );
}
function Counter() {
  const [state, setState] = useContext(AppContext);
  return (
    <div>
      <p>{state.number}</p>
      <button
        onClick={() => {
          setState({ number: state.number + 1 });
        }}
      >
        +
      </button>
    </div>
  );
}
function render() {
  ReactDOM.render(<App />, document.getElementById("root"));
}

render();

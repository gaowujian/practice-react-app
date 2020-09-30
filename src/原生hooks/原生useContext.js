import React from "react";
import { useContext } from "react";
import { useState } from "react";
import ReactDOM from "react-dom";

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

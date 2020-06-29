import React, { useContext, useReducer } from "react";
import reducer from "./reducer";
import ThemeContext from "./themeContext";
const initialState = {
  themes: {
    light: {
      foreground: "#000000",
      background: "#eeeeee",
    },
    dark: {
      foreground: "#ffffff",
      background: "#222222",
    },
  },
  currentTheme: {},
};
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const value = useContext(ThemeContext);
  console.log(value);
  const {
    state: { currentTheme },
    dispatch,
  } = useContext(ThemeContext);
  return (
    <div>
      <button
        style={{
          background: currentTheme.background,
          color: currentTheme.foreground,
        }}
      >
        I am styled by theme context!
      </button>
      <button
        onClick={() => {
          dispatch({ type: "light" });
        }}
      >
        light
      </button>
      <button
        onClick={() => {
          dispatch({ type: "dark" });
        }}
      >
        dark
      </button>
    </div>
  );
}

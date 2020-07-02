import React from "react";
import { useAsync } from "react-use";
import { getUser } from "./service";
const App = () => {
  const state = useAsync(getUser, []);
  console.log(state);
  return (
    <div>
      {state.loading ? (
        <div>Loading...</div>
      ) : state.error ? (
        <div>Error: {state.error.message}</div>
      ) : (
        <div>
          <h2>user: {state.value.user}</h2>
          <h2>age:{state.value.age}</h2>
        </div>
      )}
    </div>
  );
};

export default App;

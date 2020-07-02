import React from "react";
import { getUser } from "./service";
// import { useRequest } from "ahooks";
import { useRequest } from "@umijs/hooks";
const App = () => {
  const { data, error, loading } = useRequest(getUser);
  console.log(data, error, loading);
  if (error) {
    return <div>failed to load</div>;
  }
  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <div>
      Username: {data.name} userage: {data.age}
    </div>
  );
};

export default App;

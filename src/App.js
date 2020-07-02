import React from "react";
import useSWR from "swr";
import { getUser } from "./service";
function App() {
  const { data, error } = useSWR("/api/user", getUser);
  console.log(data, error);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <div>
      hello {data.user} {data.age}!
    </div>
  );
}
export default App;

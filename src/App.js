import React from "react";
import useMyAsync from "./useMyAsync";

function App() {
  const [loading, name, age, getData] = useMyAsync();
  return (
    <div>
      <h1>显示用户状态</h1>
      {!loading ? (
        <div>
          <h2>用户姓名:{name}</h2>
          <h2>用户年龄:{age}</h2>
        </div>
      ) : (
        "加载中"
      )}
      <hr />
      <button onClick={getData}>重新获取数据</button>
    </div>
  );
}

export default App;

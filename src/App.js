import { useDebounceFn } from "./hooks";
import React, { useState } from "react";

export default () => {
  const [value, setValue] = useState(0);
  const { run, cancel, flush } = useDebounceFn(
    () => {
      console.log("value:", value);
      setValue(value + 1);
    },
    {
      wait: 2000,
    }
  );

  return (
    <div>
      <p style={{ marginTop: 16 }}> Clicked count: {value} </p>
      <button type="button" onClick={run}>
        Click fast!
      </button>
      <button type="button" onClick={cancel}>
        cancel
      </button>
      <button type="button" onClick={flush}>
        flush
      </button>
    </div>
  );
};

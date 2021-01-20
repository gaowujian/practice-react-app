import React, { useContext } from "react";
import { memo } from "react";
import { useEffect } from "react";
import { FormContext } from "./Form";

function Input({ name }) {
  const { state, dispatch } = useContext(FormContext);
  const value = state[name] || "";
  useEffect(() => {
    // dispatch({
    //   type: "ADD",
    //   payload: {
    //     name,
    //     data: value,
    //   },
    // });
  }, [dispatch, name, value]);
  return (
    <input
      value={value}
      onChange={(e) => {
        dispatch({
          type: "ADD",
          payload: {
            name,
            data: e.target.value,
          },
        });
      }}
    />
  );
}

export default memo(Input);

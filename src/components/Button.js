import React from "react";
import { useCallback } from "react";
import { useContext } from "react";
import { FormContext } from "./Form";

function Button(props) {
  const { type, htmlType } = props;
  const context = useContext(FormContext);
  const handleSubmit = useCallback(
    function () {
      context.onFinish(context.state);
    },
    [context]
  );

  return (
    <button className={type} type={htmlType} onClick={handleSubmit}>
      {props.children}
    </button>
  );
}

export default Button;

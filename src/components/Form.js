import React, { useContext, useReducer } from "react";
import Schema from "async-validator";
import { useState } from "react";
import { useEffect } from "react";
export const FormContext = React.createContext();

const initialState = {};

function reducer(state = initialState, { type, payload }) {
  const { name, data } = payload;
  switch (type) {
    case "ADD":
      return { ...state, [name]: data };
    default:
      return state;
  }
}

function Form(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FormContext.Provider value={{ state, dispatch, ...props }}>
      {props.children}
    </FormContext.Provider>
  );
}

Form.Item = function Item(props) {
  const { label, name, rules } = props;
  const context = useContext(FormContext);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (name) {
      const newValue = context.state[name];
      const descriptor = {
        [name]: rules,
      };
      const schema = new Schema(descriptor);

      schema.validate({ [name]: newValue }, (err) => {
        if (err) {
          setErr(JSON.stringify(err[0]));
        } else {
          console.log("no err");
          setErr(null);
        }
      });
    }
  }, [context, name, rules]);

  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      {React.cloneElement(props.children, { name })}
      {err}
    </div>
  );
};

export default Form;

import React, { useCallback, useEffect, useRef, useState } from "react";
import "./app.css";
import * as actions from "./actions";

function Control({ dispatch }) {
  const textRef = useRef(null);
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      //   addTodo({
      //     content: textRef.current.value,
      //     id: Date.now(),
      //     complete: false,
      //   });
      dispatch(
        actions.createAdd({
          content: textRef.current.value,
          id: Date.now(),
          complete: false,
        })
      );
    },
    [dispatch]
  );
  return (
    <div className="control">
      <h1>todos</h1>
      <form action="" onSubmit={onSubmit}>
        <input type="text" ref={textRef} placeholder="what needs to be done?" />
      </form>
    </div>
  );
}

function Todos(props) {
  const { todos, dispatch } = props;

  return (
    <ul className="todos">
      {todos.map((todo) => {
        return (
          <li key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={() => dispatch(actions.createToggle(todo.id))}
            />
            <label htmlFor="" className={todo.complete ? "complete" : null}>
              {todo.content}
            </label>
            <span
              dangerouslySetInnerHTML={{ __html: "&cross;" }}
              onClick={() => {
                dispatch(actions.createRemove(todo.id));
              }}
            ></span>
          </li>
        );
      })}
    </ul>
  );
}

export default function App() {
  const [todos, setTodos] = useState([]);

  const dispatch = useCallback((action) => {
    const { type, payload } = action;
    switch (type) {
      case "set":
        setTodos(payload);
        break;
      case "add":
        setTodos((todos) => [...todos, payload]);
        break;
      case "remove":
        setTodos((todos) => todos.filter((todo) => todo.id !== payload));
        break;
      case "toggle":
        setTodos((todos) =>
          todos.map((todo) => {
            if (todo.id === payload) {
              todo.complete = !todo.complete;
            }
            return todo;
          })
        );
        break;
      default:
        break;
    }
  }, []);

  //   const addTodo = useCallback(
  //     (todo) => {
  //       dispatch({ type: "add", payload: todo });
  //     },
  //     [dispatch]
  //   );
  //   const removeTodo = useCallback(
  //     (id) => {
  //       dispatch({ type: "add", payload: id });
  //     },
  //     [dispatch]
  //   );
  //   const toggleTodo = useCallback(
  //     (id) => {
  //       dispatch({ type: "add", payload: id });
  //     },
  //     [dispatch]
  //   );
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("_todos")) || [];
    dispatch(actions.createSet(todos));
  }, [dispatch]);
  useEffect(() => {
    localStorage.setItem("_todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todo-app">
      <Control dispatch={dispatch} />
      <Todos todos={todos} dispatch={dispatch} />
    </div>
  );
}

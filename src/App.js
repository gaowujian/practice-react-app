import React, { useCallback, useEffect, useRef, useState } from "react";
import "./app.css";
import * as actions from "./actions";

function Control({ addTodo }) {
  const textRef = useRef(null);
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      addTodo({
        content: textRef.current.value,
        id: Date.now(),
        complete: false,
      });
    },
    [addTodo]
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
  const { todos, removeTodo, toggleTodo } = props;

  return (
    <ul className="todos">
      {todos.map((todo) => {
        return (
          <li key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={() => toggleTodo(todo.id)}
            />
            <label htmlFor="" className={todo.complete ? "complete" : null}>
              {todo.content}
            </label>
            <span
              dangerouslySetInnerHTML={{ __html: "&cross;" }}
              onClick={() => {
                removeTodo(todo.id);
              }}
            ></span>
          </li>
        );
      })}
    </ul>
  );
}

// 我们的目的是两个
// 1. 依然保持现在代码的整洁行，行为描述和逻辑是分开的,
//   意思就是把逻辑抽象成行为函数，我们只需要调用函数
// 2. 简化dispatch(actions.createRemove(todo.id))这种语法
// 我们可以直接 removeTodo(todo.id)

// actionCreators 形如 {xx:createAdd,xx:createToggle}
function bindActionCreators(actionCreators, dispatch) {
  const result = {};
  for (const key in actionCreators) {
    result[key] = function (...args) {
      const actionCreator = actionCreators[key];
      //  该函数返回一个对象，代表一个描述多种行为函数的结合，
      // 可以帮我们自动去创建action，并dispatch该action
      const action = actionCreator(...args);
      dispatch(action);
    };
  }
  return result;
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
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("_todos")) || [];
    dispatch(actions.createSet(todos));
  }, [dispatch]);
  useEffect(() => {
    localStorage.setItem("_todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todo-app">
      <Control
        {...bindActionCreators({ addTodo: actions.createAdd }, dispatch)}
      />
      <Todos
        todos={todos}
        {...bindActionCreators(
          {
            setTodo: actions.createSet,
            removeTodo: actions.createRemove,
            toggleTodo: actions.createToggle,
          },
          dispatch
        )}
      />
    </div>
  );
}

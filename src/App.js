import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import "./app.css";
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

export default function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = useCallback((todo) => {
    setTodos((todos) => [...todos, todo]);
  }, []);
  const removeTodo = useCallback((id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }, []);
  const toggleTodo = useCallback((id) => {
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo.id === id) {
          todo.complete = !todo.complete;
        }
        return todo;
      })
    );
  }, []);
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("_todos")) || [];
    setTodos(todos);
  }, []);
  useEffect(() => {
    localStorage.setItem("_todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todo-app">
      <Control addTodo={addTodo} />
      <Todos todos={todos} removeTodo={removeTodo} toggleTodo={toggleTodo} />
    </div>
  );
}

import React, { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./style.css";

function App() {
  const [show, setShow] = useState(false);
  const contentRef = useRef();
  return (
    <div>
      <section>
        <h1>使用js操作ref</h1>
        <div className="enter" ref={contentRef}>
          我是一个内容区域
        </div>
        <br />
        <button
          onClick={() => {
            contentRef.current &&
              contentRef.current.classList.toggle("enter-active");
          }}
        >
          显示/隐藏
        </button>
      </section>
      <section>
        <h1>使用react-transition-group</h1>

        <CSSTransition in={show} appear timeout={2000} classNames="my-node">
          <div className={!show ? "my-node-base" : ""}>我是一个内容区域</div>
        </CSSTransition>

        <br />
        <button
          onClick={() => {
            setShow(!show);
          }}
        >
          显示/隐藏
        </button>
      </section>
    </div>
  );
}

export default App;

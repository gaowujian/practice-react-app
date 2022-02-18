import React, { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./style.css";
import "./animate.css";

function App() {
  const [show, setShow] = useState(true);
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
            contentRef.current && contentRef.current.classList.toggle("enter-active");
          }}
        >
          显示/隐藏
        </button>
      </section>
      <section>
        <h1>使用react-transition-group</h1>
        <CSSTransition
          in={show}
          appear
          timeout={1000}
          classNames={{
            appear: "animate__faster animate__animated",
            appearActive: "animate__faster animate__animated animate__lightSpeedInLeft",
            appearDone: "animate__faster animate__animated animate__lightSpeedInLeft",
            enter: "animate__faster animate__animated",
            enterActive: "animate__faster animate__animated animate__lightSpeedInLeft",
            enterDone: "animate__faster animate__animated animate__lightSpeedInLeft",
            exit: "animate__faster animate__animated",
            exitActive: "animate__faster animate__animated animate__lightSpeedOutRight",
            exitDone: "animate__faster animate__animated animate__lightSpeedOutRight",
          }}
        >
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio minus repellendus, delectus asperiores
            voluptates quae?
          </div>
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

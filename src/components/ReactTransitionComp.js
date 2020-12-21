import React, { useRef, useState } from "react";
import { Transition, CSSTransition } from "react-transition-group";
import "./transitionGroup.css";
const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 0.5 },
  entered: { opacity: 1 },
  exiting: { opacity: 0.4 },
  exited: { opacity: 0 },
};

const ReactTransitionComp = () => {
  const [inProp, setInProp] = useState(true);
  const ref = React.createRef()
  return (
    <div>
      {/* <Transition
        in={inProp}
        appear
        timeout={duration}
        onEnter={() => {
          //console.log("onenter回调执行");
        }}
        onEntered={() => {
          //console.log("onentered回调执行");
        }}
        nodeRef={ref}
        addEndListener={(node, done) => {
          //console.log(node);
          node.addEventListener("transitionend", done);
        }}
        mountOnEnter
        unmountOnExit
      >
        {(state) => {
          //console.log(state);
          return (
            <div
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
            >
              I'm a fade Transition!
            </div>
          );
        }}
      </Transition>
      <button onClick={() => setInProp(!inProp)}>Click to Enter</button> */}
      <hr style={{ marginTop: 20 }} />
      <CSSTransition in={inProp} appear timeout={3000} classNames="my-node">
        <div>{"I'll receive my-node-* classes"}</div>
      </CSSTransition>
      <button type="button" onClick={() => setInProp(!inProp)}>
        Click to
      </button>
    </div>
  );
};
export default ReactTransitionComp;

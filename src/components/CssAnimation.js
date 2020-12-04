import React, { useState } from "react";
import "./animation.css";

export default function CssAnimation() {
  const [animated, setAnimated] = useState(false);
  return (
    <div className="fadeIn">
      <h1>css CssAnimation</h1>
      <button
        className={animated ? "jump" : ""}
        onClick={() => {
          setAnimated(!animated);
        }}
      >
        jump
      </button>
    </div>
  );
}

import React, { useState } from "react";
import { Motion, spring, presets } from "react-motion";

export default function ReactMotion() {
  const [startAnimation, setAnimation] = useState(false);
  const initialStyle = { opacity: 0, translateY: 30 };
  return (
    <div>
      <Motion
        style={
          startAnimation
            ? {
                opacity: spring(1),
                translateY: spring(0, presets.wobbly),
              }
            : initialStyle
        }
      >
        {(interpolatedStyles) => (
          <div
            style={{
              transform: `translateY(${interpolatedStyles.translateY}px)`,
              opacity: interpolatedStyles.opacity,
            }}
          >
            <h1>Basic Animation Example</h1>
          </div>
        )}
      </Motion>
      <br />
      <button onClick={() => setAnimation(true)}>Trigger Animation</button>
      <button onClick={() => setAnimation(false)}>Reset Animation</button>
    </div>
  );
}

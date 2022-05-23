import React, { useEffect, useState } from "react";
function withMouse(WrappedComponent) {
  return function () {
    const [mousePos, setMousePos] = useState({});
    useEffect(() => {
      document.addEventListener("mousemove", (e) => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    }, []);
    return <WrappedComponent mousePos={mousePos} />;
  };
}

export default withMouse;

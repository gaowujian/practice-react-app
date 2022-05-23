import React, { useEffect, useState } from "react";
function MouseComp(props) {
  const [mousePos, setMousePos] = useState();
  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    });
  }, []);

  return props.render(mousePos);
}

export default MouseComp;

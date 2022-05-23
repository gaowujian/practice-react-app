import { useEffect, useState } from "react";
function useMouse() {
  const [mousePos, setMousePos] = useState({});
  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    });
  }, []);
  return mousePos;
}

export default useMouse;

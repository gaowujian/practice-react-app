import { useEffect, useRef } from "react";

// 可以反应一个组件是否卸载，卸载了为true，没有卸载是false
function useUnmountedRef() {
  const ref = useRef(false);

  useEffect(() => {
    ref.current = false;
    return () => {
      ref.current = true;
    };
  }, []);

  return ref;
}

export default useUnmountedRef;

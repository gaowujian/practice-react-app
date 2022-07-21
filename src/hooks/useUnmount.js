import { useEffect } from "react";

// 可以反应一个组件是否卸载，卸载了为true，没有卸载是false
function useUnmount(cb) {
  /*  eslint-disable */
  useEffect(() => {
    return () => {
      cb();
    };
  }, []);
}

export default useUnmount;

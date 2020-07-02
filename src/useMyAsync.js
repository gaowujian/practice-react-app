import { useState, useCallback, useEffect } from "react";
import { getUser } from "./service";

export default () => {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState(null);
  const [age, setAge] = useState(null);
  const getData = useCallback(() => {
    setLoading(true);
    getUser().then(
      (data) => {
        const { name, age } = data;
        console.log("请求成功！");
        setLoading(false);
        setName(name);
        setAge(age);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);
  useEffect(() => {
    getData();
  }, [getData]);
  return [loading, name, age, getData];
};

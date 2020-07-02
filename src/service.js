export const getUser = function getUser() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const num = Math.random();
      console.log(num);
      if (num > 0.5) rej("请求失败!");
      else res({ name: "tony", age: 28 });
    }, 1000);
  });
};

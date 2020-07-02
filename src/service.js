import axios from "axios";
axios.interceptors.response.use((res) => {
  if (Math.random() > 0.5) return res.data;
  else throw new Error("服务器500");
});
export const getUser = function getUser() {
  return axios.get("http://localhost:5050/api/user");
};

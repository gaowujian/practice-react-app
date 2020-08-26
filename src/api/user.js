import http from "./http";
export function login() {
  return http.post("/login");
}

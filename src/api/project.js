import http from "./http";
function getEpisodes() {
  return http.post("/episodes");
}
export default {
  getEpisodes,
};

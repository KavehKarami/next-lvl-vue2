import axios from "axios";
// import NProgress from "nprogress";

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    Accepts: "application/json",
    "Content-Type": "application/json",
  },
});

// api.interceptors.request.use((config) => {
//   NProgress.start();
//   return config;
// });

// api.interceptors.response.use(
//   (response) => {
//     NProgress.done();
//     return response;
//   },
//   (error) => {
//     NProgress.done();
//     return error;
//   }
// );

export default {
  getEvents(perPage, page) {
    return api.get(`/events?_limit=${perPage}&_page=${page}`);
  },
  getEvent(id) {
    return api.get("/events/" + id);
  },
  createEvent(event) {
    return api.post("/events", event);
  },
};

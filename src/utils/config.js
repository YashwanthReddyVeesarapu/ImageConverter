import axios from "axios";

export const apiInstance = axios.create({
  // baseURL: "https://api.redash.us/"
  baseURL: "http://localhost:4000/",
});

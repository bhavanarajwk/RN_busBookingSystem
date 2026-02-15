import axios from "axios";

const API = axios.create({
  baseURL: "http://10.48.47.155:3000",
});


export default API;

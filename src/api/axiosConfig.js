import axios from "axios";

const API = axios.create({
  baseURL: "http://10.48.47.155", // Android emulator
  // If using real phone, use your PC IP
});

export default API;

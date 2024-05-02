import axios from "axios"

const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
  // baseURL: "/Backend_Speakable_English/api/",
//   baseURL:"https://speakable-backend.onrender.com/api/",
  withCredentials: true,
});

export default instance
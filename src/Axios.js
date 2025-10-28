import axios from 'axios'

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://mern-todo-backend.up.railway.app";

const Todoinstance = axios.create({
  baseURL: `${API_BASE_URL}/api/todo`,
  withCredentials: true, // important for cookies / auth
  timeout: 10000,
});

export default Todoinstance
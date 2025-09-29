import axios from 'axios'

const Todoinstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api/todo",
  timeout: 5000,
  headers: { 'X-Custom-Header': 'foobar' }
});

export default Todoinstance
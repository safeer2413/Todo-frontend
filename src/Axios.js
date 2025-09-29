import axios from 'axios'

const Todoinstance = axios.create({
    baseURL: 'http://localhost:5000/api/todo',
    timeout: 5000,
    headers: {'X-Custom-Header': 'foobar'}
  });

  export default Todoinstance
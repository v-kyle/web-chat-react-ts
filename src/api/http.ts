import axios from 'axios';

const baseURL = 'http://localhost:8888';

const http = axios.create({
  baseURL,
});

export default http;

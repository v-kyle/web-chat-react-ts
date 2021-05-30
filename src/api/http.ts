import axios from 'axios';

const baseURL = 'http://89.108.88.138:8080';

const http = axios.create({
  baseURL,
});

export default http;

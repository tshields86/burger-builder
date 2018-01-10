import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-61e27.firebaseio.com/'
});

export default instance;
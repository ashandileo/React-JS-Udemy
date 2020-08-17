import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-aa3cc.firebaseio.com/'
});

export default instance;
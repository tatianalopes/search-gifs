import axios from 'axios';

const gifApi = axios.create({
  baseURL: 'https://api.giphy.com/v1/gifs',
});

export default gifApi;
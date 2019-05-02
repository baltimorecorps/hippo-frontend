import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: 'Client-ID a882966edbc9651b1e07012f887b0a1cdb0e939dd3fefe6eff275608fc063d82',
  },
});

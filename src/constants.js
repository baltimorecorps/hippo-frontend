export const IS_LOCAL = window.location.href.includes('://localhost');
export const API_URL = IS_LOCAL
  ? 'http://127.0.0.1:5000'
  : 'https://bcorps-hippo-backend.herokuapp.com/';

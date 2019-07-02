const getApiUrl = (environment) => {
  switch (environment) {
    case 'production':
      return 'https://api.baltimorecorps.org/';
    case 'staging':
      return 'https://dev-api.baltimorecorps.org/';
    default:
      return 'http://127.0.0.1:5000/';
  }
};

export const API_URL = getApiUrl(process.env.REACT_APP_ENVIRONMENT);

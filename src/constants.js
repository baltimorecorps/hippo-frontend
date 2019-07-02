const getApiUrl = (environment) => {
  switch (environment) {
    case 'production':
      return 'http://api.baltimorecorps.org/';
    case 'staging':
      return 'http://dev-api.baltimorecorps.org/';
    default:
      return 'http://127.0.0.1:5000/';
  }
};

export const API_URL = getApiUrl(process.env.REACT_APP_ENVIRONMENT);

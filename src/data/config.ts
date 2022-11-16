export const config = {
  api: {
    domain: 'https://api.thecatapi.com',
    key: String(process.env.REACT_APP_CAT_API_KEY),
    limit: 10,
    version: 'v1'
  }
};

export default config;

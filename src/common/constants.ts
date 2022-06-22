const constants = {
  RESPONSE_STATUS: {
    SUCCESS: 'SUCCESS',
    PENDING: 'PENDING',
    FAILURE: 'FAILURE',
  },
  PAGINATION: { PAGE: 0, LIMIT: 10 },
  ROUTES: [
    { to: '/', label: 'Cats' },
    { to: '/breeds', label: 'Breeds' },
    { to: '/favorites', label: 'Favorites' },
  ],
};

export default constants;

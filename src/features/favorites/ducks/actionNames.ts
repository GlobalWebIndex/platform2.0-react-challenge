const PREFIX = 'favorites';

const ActionNames = {
  FETCH_FAVORITES_REQUESTED: `${PREFIX}/list/requested`,
  FETCH_FAVORITES_SUCCEDED: `${PREFIX}/list/succeded`,
  FETCH_FAVORITES_FAILED: `${PREFIX}/list/failed`,

  DELETE_FAVORITE_REQUESTED: `${PREFIX}/delete/requested`,
  DELETE_FAVORITE_SUCCEDED: `${PREFIX}/delete/succeded`,
  DELETE_FAVORITE_FAILED: `${PREFIX}/delete/failed`,
};

export default ActionNames;

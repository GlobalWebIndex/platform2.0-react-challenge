const PREFIX = 'home';

const ActionNames = {
  FETCH_HOME_CATS_REQUESTED: `${PREFIX}/cats/requested`,
  FETCH_HOME_CATS_SUCCEDED: `${PREFIX}/cats/succeded`,
  FETCH_HOME_CATS_FAILED: `${PREFIX}/cats/failed`,

  FETCH_CAT_INFO_REQUESTED: `${PREFIX}/catById/requested`,
  FETCH_CAT_INFO_SUCCEDED: `${PREFIX}/catById/succeded`,
  FETCH_CAT_INFO_FAILED: `${PREFIX}/catById/failed`,

  MARK_CAT_FAVORITE_REQUESTED: `${PREFIX}/favorite/requested`,
  MARK_CAT_FAVORITE_SUCCEDED: `${PREFIX}/favorite/succeded`,
  MARK_CAT_FAVORITE_FAILED: `${PREFIX}/favorite/failed`,
};

export default ActionNames;

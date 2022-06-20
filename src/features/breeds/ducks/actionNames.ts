const PREFIX = 'breeds';

const ActionNames = {
  FETCH_BREEDS_REQUESTED: `${PREFIX}/list/requested`,
  FETCH_BREEDS_SUCCEDED: `${PREFIX}/list/succeded`,
  FETCH_BREEDS_FAILED: `${PREFIX}/list/failed`,

  FETCH_BREED_CATS_REQUESTED: `${PREFIX}/cats/requested`,
  FETCH_BREED_CATS_SUCCEDED: `${PREFIX}/cats/succeded`,
  FETCH_BREED_CATS_FAILED: `${PREFIX}/cats/failed`,
};

export default ActionNames;

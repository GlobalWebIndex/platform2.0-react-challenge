import ActionNames from './actionNames';

function getCats({ page, limit }: { page: number; limit: number }) {
  return {
    type: ActionNames.FETCH_HOME_CATS_REQUESTED,
    payload: {
      page,
      limit,
    },
  } as const;
}

function catsSucceeded(data: any[]) {
  return {
    type: ActionNames.FETCH_HOME_CATS_SUCCEDED,
    payload: {
      data,
    },
  } as const;
}

function catsFailed() {
  return {
    type: ActionNames.FETCH_HOME_CATS_FAILED,
    payload: {},
  } as const;
}

export default {
  getCats,
  catsSucceeded,
  catsFailed,
};

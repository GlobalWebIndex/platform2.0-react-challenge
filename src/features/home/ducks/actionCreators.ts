import ActionNames from './actionNames';
import { ICat } from '../types';

function getCats({ page, limit }: { page: number; limit: number }) {
  return {
    type: ActionNames.FETCH_HOME_CATS_REQUESTED,
    payload: {
      page,
      limit,
    },
  } as const;
}

function catsSucceeded({ data, page }: { data: ICat[]; page: number }) {
  return {
    type: ActionNames.FETCH_HOME_CATS_SUCCEDED,
    payload: {
      data,
      page,
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

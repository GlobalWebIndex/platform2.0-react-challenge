import { ICat } from 'features/home/types';
import ActionNames from './actionNames';
import { IBreed } from '../types';

function getBreeds({ page, limit }: { page: number; limit: number }) {
  return {
    type: ActionNames.FETCH_BREEDS_REQUESTED,
    payload: {
      page,
      limit,
    },
  } as const;
}

function breedsSucceeded({ data }: { data: IBreed[] }) {
  return {
    type: ActionNames.FETCH_BREEDS_SUCCEDED,
    payload: {
      data,
    },
  } as const;
}

function breedsFailed() {
  return {
    type: ActionNames.FETCH_BREEDS_FAILED,
    payload: {},
  } as const;
}

function getCatsByBreed(breedName: string) {
  return {
    type: ActionNames.FETCH_BREED_CATS_REQUESTED,
    payload: {
      breedName,
    },
  } as const;
}

function catsByBreedSucceeded(data: ICat[]) {
  return {
    type: ActionNames.FETCH_BREED_CATS_SUCCEDED,
    payload: {
      data,
    },
  } as const;
}

function catsByBreedFailed() {
  return {
    type: ActionNames.FETCH_BREED_CATS_FAILED,
    payload: {},
  } as const;
}

export default {
  getBreeds,
  breedsSucceeded,
  breedsFailed,
  getCatsByBreed,
  catsByBreedSucceeded,
  catsByBreedFailed,
};

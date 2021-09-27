import { DefaultStateType, ErrorPayload } from 'types/app';
import { BreedType } from 'types/breeds';
import * as actionTypes from './actionTypes';

/************************* Breeds *************************/
export type BreedsLoadingType = {
  type: typeof actionTypes.BREEDS_LOADING;
};

export type BreedsSuccessType = {
  type: typeof actionTypes.BREEDS_SUCCESS;
  payload: {
    data: BreedType[];
  };
};

export type BreedsFailureType = {
  type: typeof actionTypes.BREEDS_FAILURE;
  payload: ErrorPayload;
};

export type BreedsActionType = BreedsLoadingType | BreedsSuccessType | BreedsFailureType;

export type BreeedsStateType = DefaultStateType & {
  list: BreedType[];
};

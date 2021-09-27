import { RootStateType } from "../rootReducer";

export const allImagesSelector = (state: RootStateType) =>
  state.images.all.list;

export const imagesLoadingSelector = (state: RootStateType) =>
  state.images.all.loading;

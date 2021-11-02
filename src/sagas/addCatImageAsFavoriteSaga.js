import { call, put } from 'redux-saga/effects';
import submitCommand from '../RestClient/restClient';
import { closeModalAction, openModalAction } from '../widgets/Modal/modalActions';
import {navigate} from "../common/navigationUtils";
import * as PATHS from "../AppCore/common/constants";

/**
 * Saga for posting an image as favorite
 * {@link SUBMIT_IMAGE_AS_FAVORITE} {@link addCatImageAsFavoriteAction}
 */
function* addCatImageAsFavoriteSaga(action) {
  try {
    const submitBody = {
      image_id: action.payload.catImgId,
      sub_id: 'A.Rammos'
    };
    yield call(submitCommand, '/favourites', submitBody);
    yield put (closeModalAction('randomCatModal'));
    yield put(openModalAction('favoriteImgModal', { catImgId: action.payload.catImgId }));
    navigate(PATHS.RANDOM_CATS);
  } catch (error) {
    // Error handling here
  }
}

export default addCatImageAsFavoriteSaga;

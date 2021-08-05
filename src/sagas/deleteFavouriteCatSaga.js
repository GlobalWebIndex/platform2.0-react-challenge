import {call, put} from 'redux-saga/effects'
import {deleteData} from '../common/utils'
import {deleteFavouriteCatApi} from '../apis/apis'
import {updateFavouriteImagesAction, setErrorAction} from "../actions/actions";

/**
 * Worker saga to delete a favourite cat. If succeeded updates the favourite images in redux state
 * else sets the error in redux state
 * {@link DELETE_FAVOURITE_CAT}
 * @param action
 */
function* deleteFavouriteCatSaga(action) {
    try {
        const favourite_id = action.payload;
        const response = yield call(deleteData, deleteFavouriteCatApi(favourite_id));
        if (response.message === 'SUCCESS') {
            yield put(updateFavouriteImagesAction(favourite_id));
        } else {
            yield put(setErrorAction({deleteFavouriteCat: response.message}));
        }
    } catch (error) {
        yield put(setErrorAction({deleteFavouriteCat: 'Error deleting favourite cat'}));
    }
}

export default deleteFavouriteCatSaga;
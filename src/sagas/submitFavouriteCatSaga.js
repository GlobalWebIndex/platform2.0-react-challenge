import {call, put} from 'redux-saga/effects'
import { postData } from '../common/utils'
import {submitFavouriteCatApi} from '../apis/apis'
import {setFavouriteCatAction, setErrorAction, clearFavouriteCatAction} from "../actions/actions";
import {MY_USER_ID} from "../common/constants";

/**
 * Worker saga to submit the favourite cat. If succeeded set the favourite cat in redux state
 * else sets the error in redux state
 * {@link SUBMIT_FAVOURITE_CAT}
 * @param action
 */
function* submitFavouriteCatSaga(action) {
    try {
        const image_id = action.payload;
        yield put(clearFavouriteCatAction());
        const response = yield call(postData, submitFavouriteCatApi(), { image_id, sub_id: MY_USER_ID });
        if (response.message === 'SUCCESS') {
            yield put(setFavouriteCatAction(response));
        } else {
            yield put(setErrorAction({favouriteCat: response.message}));
        }
    } catch (error) {
        yield put(setErrorAction({favouriteCat: 'Error submitting favourite cat'}));
    }
}

export default submitFavouriteCatSaga;
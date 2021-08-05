import {call, put} from 'redux-saga/effects'
import {getData} from '../common/utils'
import {
    setCatImageAction,
    setErrorAction,
    setLoadingAction
} from "../actions/actions";
import {getCatImageApi} from '../apis/apis'

/**
 * Worker saga to get the cat image. If succeeded set the cat image in redux state
 * else sets the error in redux state
 * {@link GET_CAT_IMAGE}
 * @param action
 */
function* getCatImageSaga(action) {
    try {
        const image_id = action.payload;
        yield put(setLoadingAction({catImage: true}));
        const response = yield call(getData, getCatImageApi(image_id));
        if(response.message) {
            yield put(setErrorAction({catImage: response.message}));
        } else {
            yield put(setCatImageAction(response));
        }
        yield put(setLoadingAction({catImage: false}));
    } catch (error) {
        yield put(setErrorAction({catImage: 'Error getting cat image'}));
    }
}

export default getCatImageSaga;
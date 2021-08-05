import {call, put} from 'redux-saga/effects'
import {getData} from '../common/utils'
import {
    setCatImagesAction,
    setErrorAction,
    setLoadingAction
} from "../actions/actions";
import {getInitialCatImagesApi} from '../apis/apis'

/**
 * Worker saga to get the cat images. If succeeded set the cat images in redux state
 * else sets the error in redux state
 * {@link GET_CAT_IMAGES}
 * @param action
 */
function* getCatImagesSaga(action) {
    try {
        const page = action.payload;
        yield put(setLoadingAction({catImages: true}));
        const response = yield call(getData, getInitialCatImagesApi(page));
        if(response.message) {
            yield put(setErrorAction({catImages: response.message}));
        } else {
            yield put(setCatImagesAction(response));
        }
        yield put(setLoadingAction({catImages: false}));
    } catch (error) {
        yield put(setErrorAction({catImages: 'Error getting cat images'}));
    }
}

export default getCatImagesSaga;
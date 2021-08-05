import {call, put} from 'redux-saga/effects'
import {getData} from '../common/utils'
import {
    setBreedImagesAction,
    setErrorAction,
    setLoadingAction
} from "../actions/actions";
import {getBreedImagesApi} from '../apis/apis'

/**
 * Worker saga to get the breed images. If succeeded set the breed images in redux state
 * else sets the error in redux state
 * {@link GET_BREED_IMAGES}
 * @param action
 */
function* getBreedImagesSaga(action) {
    try {
        const breed_id = action.payload;
        yield put(setLoadingAction({breedImages: true}));
        const response = yield call(getData, getBreedImagesApi(breed_id));
        if(response.message) {
            yield put(setErrorAction({breedImages: response.message}));
        } else {
            yield put(setBreedImagesAction(response));
        }
        yield put(setLoadingAction({breedImages: false}));
    } catch (error) {
        yield put(setErrorAction({breedImages: 'Error getting breed images'}));
    }
}

export default getBreedImagesSaga;
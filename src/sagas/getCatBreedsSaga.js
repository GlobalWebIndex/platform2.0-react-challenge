import {call, put} from 'redux-saga/effects'
import {getData} from '../common/utils'
import {
    setCatBreedsAction,
    setErrorAction,
    setLoadingAction
} from "../actions/actions";
import {getCatBreedsApi} from '../apis/apis'

/**
 * Worker saga to get the cat breeds. If succeeded set the cat breeds in redux state
 * else sets the error in redux state
 * {@link GET_CAT_BREEDS}
 * @param action
 */
function* getCatBreedsSaga(action) {
    try {
        const page = action.payload;
        yield put(setLoadingAction({catBreeds: true}));
        const response = yield call(getData, getCatBreedsApi(page));
        if(response.message) {
            yield put(setErrorAction({catBreeds: response.message}));
        } else {
            yield put(setCatBreedsAction(response));
        }
        yield put(setLoadingAction({catBreeds: false}));
    } catch (error) {
        yield put(setErrorAction({catBreeds: 'Error getting cat breeds'}));
    }
}

export default getCatBreedsSaga;
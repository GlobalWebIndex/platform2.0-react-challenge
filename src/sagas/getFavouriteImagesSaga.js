import {call, put} from 'redux-saga/effects'
import {getData} from '../common/utils'
import {
    setFavouriteImagesAction,
    setErrorAction,
    setLoadingAction
} from "../actions/actions";
import {getFavouriteImagesApi} from '../apis/apis'
import {MY_USER_ID} from "../common/constants";

/**
 * Worker saga to get the favourite images. If succeeded set the favourite images in redux state
 * else sets the error in redux state
 * {@link GET_FAVOURITE_IMAGES}
 * @param action
 */
function* getFavouriteImagesSaga(action) {
    try {
        const page = action.payload;
        yield put(setLoadingAction({favouriteImages: true}));
        const response = yield call(getData, getFavouriteImagesApi(page, MY_USER_ID));
        if(response.message) {
            yield put(setErrorAction({favouriteImages: response.message}));
        } else {
            yield put(setFavouriteImagesAction(response));
        }
        yield put(setLoadingAction({favouriteImages: false}));
    } catch (error) {
        yield put(setErrorAction({favouriteImages: 'Error getting favourite images'}));
    }
}

export default getFavouriteImagesSaga;
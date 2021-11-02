import { call, put } from 'redux-saga/effects';
import { setUIState } from '../../actions/catLoversActions';

/**
 * Saga that handles the open modal action.
 *
 * @param action am {@link openModalAction}
 *
 * @see {@link OPEN_MODAL}
 */
export function* openModalSaga(action) {
  try {
    yield put(
      setUIState(
        ['modal', action.payload.modalIdentifier], true
      )
    );
    yield put(
      setUIState(
        ['modal', 'modalProps', action.payload.modalIdentifier], action.payload.modalProps
      )
    );
    if (action.payload.openCallback) {
      let args = [];
      if (action.payload.openCallbackArgs) {
        args = action.payload.openCallbackArgs;
      }
      yield call(
        action.payload.openCallback,
        ...args
      );
    }
  } catch (error) {
    // Error handling here
  }
}

/**
 * Saga that handles the close modal action.
 *
 * @param action am {@link closeModalAction}
 *
 * @see {@link CLOSE_MODAL}
 */
export function* closeModalSaga(action) {
  try {
    yield put(
      setUIState(
        ['modal', action.payload.modalIdentifier],
        false
      )
    );
    if (action.payload.closeCallback) {
      let args = [];
      if (action.payload.closeCallbackArgs) {
        args = action.payload.closeCallbackArgs;
      }
      yield call(
        action.payload.closeCallback,
        ...args
      );
    }
  } catch (error) {
    // Error handling here
  }
}

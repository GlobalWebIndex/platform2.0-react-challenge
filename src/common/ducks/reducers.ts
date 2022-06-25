import { combineReducers } from 'redux';

import ActionNames from './actionNames';
import { CommonActionNames, IUIState } from 'common/types';

const initialUIState: IUIState = {
  loading: false,
};

function UIReducer(
  state = initialUIState,
  action: CommonActionNames
): IUIState {
  switch (action.type) {
    case ActionNames.COMMON_UI_LOADING_STARTED: {
      return {
        ...state,
        loading: true,
      };
    }

    case ActionNames.COMMON_UI_LOADING_FINISHED: {
      return {
        ...state,
        loading: false,
      };
    }

    default:
      return state;
  }
}

const CommonReducer = combineReducers({
  ui: UIReducer,
});

export default CommonReducer;

import { combineReducers } from 'redux';

import ActionNames from './actionNames';
import { CommonActionNames, IUIState, INotificationState } from 'common/types';

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

const initialNotificationState = {
  error: {},
  success: {},
};

function NotificationReducer(
  state = initialNotificationState,
  action: CommonActionNames
): INotificationState {
  switch (action.type) {
    case ActionNames.COMMON_NOTIFICATION_SET_MESSAGE: {
      const { messageType, data } = action.payload;

      return {
        ...state,
        [messageType]: {
          ...data,
        },
      };
    }

    case ActionNames.COMMON_NOTIFICATION_CLEAR_MESSAGE: {
      return initialNotificationState;
    }

    default:
      return state;
  }
}

const CommonReducer = combineReducers({
  ui: UIReducer,
  notification: NotificationReducer,
});

export default CommonReducer;

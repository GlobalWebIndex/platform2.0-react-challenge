import ActionNames from './actionNames';

function uiLoadingStarted() {
  return {
    type: ActionNames.COMMON_UI_LOADING_STARTED,
    payload: {},
  } as const;
}

function uiLoadingFinished() {
  return {
    type: ActionNames.COMMON_UI_LOADING_FINISHED,
    payload: {},
  } as const;
}

function setNotificationMessage(
  data: {},
  messageType: 'success' | 'error' = 'success'
) {
  return {
    type: ActionNames.COMMON_NOTIFICATION_SET_MESSAGE,
    payload: {
      messageType,
      data,
    },
  } as const;
}

function clearNotificationMessage() {
  return {
    type: ActionNames.COMMON_NOTIFICATION_CLEAR_MESSAGE,
    payload: {},
  } as const;
}

export default {
  uiLoadingStarted,
  uiLoadingFinished,
  setNotificationMessage,
  clearNotificationMessage,
};

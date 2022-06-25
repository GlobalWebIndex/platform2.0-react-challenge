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

export default {
  uiLoadingStarted,
  uiLoadingFinished,
};

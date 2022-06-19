import ActionCreators from './ducks/actionCreators';

/* ----------- ACTION NAMES -------------  */

export type CommonActionNames = ReturnType<typeof ActionCreators.uiLoadingStarted> &
  ReturnType<typeof ActionCreators.uiLoadingFinished> &
  ReturnType<typeof ActionCreators.setNotificationMessage> &
  ReturnType<typeof ActionCreators.clearNotificationMessage>;

/* ----------- STATE TYPES -------------  */

export interface IUIState {
  loading: boolean;
}

export interface INotificationState {
  error: any;
  success: any;
}

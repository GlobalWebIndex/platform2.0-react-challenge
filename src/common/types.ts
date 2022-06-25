import ActionCreators from './ducks/actionCreators';

/* ----------- ACTION NAMES -------------  */

export type CommonActionNames = ReturnType<
  typeof ActionCreators.uiLoadingStarted
> &
  ReturnType<typeof ActionCreators.uiLoadingFinished>;

/* ----------- STATE TYPES -------------  */

export interface IUIState {
  loading: boolean;
}
/* ----------- GENERIC TYPES -------------  */

export interface ILink {
  to: string;
  label: string;
}

import ActionCreators from './actionCreators';
import ActionNames from './actionNames';

describe('Common action creators', () => {
  it('will return uiLoadingStarted type and paylod', () => {
    expect(ActionCreators.uiLoadingStarted()).toEqual({
      type: ActionNames.COMMON_UI_LOADING_STARTED,
      payload: {},
    });
  });

  it('will return uiLoadingFinished type and paylod', () => {
    expect(ActionCreators.uiLoadingFinished()).toEqual({
      type: ActionNames.COMMON_UI_LOADING_FINISHED,
      payload: {},
    });
  });
});

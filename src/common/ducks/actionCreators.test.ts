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

  it('will return setNotificationMessage type and paylod', () => {
    const mockedData = {};
    const mockedMessageType = 'success';

    expect(
      ActionCreators.setNotificationMessage(mockedData, mockedMessageType)
    ).toEqual({
      type: ActionNames.COMMON_NOTIFICATION_SET_MESSAGE,
      payload: { messageType: mockedMessageType, data: mockedData },
    });
  });

  it('will return clearNotificationMessage type and paylod', () => {
    expect(ActionCreators.clearNotificationMessage()).toEqual({
      type: ActionNames.COMMON_NOTIFICATION_CLEAR_MESSAGE,
      payload: {},
    });
  });
});

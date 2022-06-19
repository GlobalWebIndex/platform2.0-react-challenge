import CommonReducers from './reducers';
import ActionNames from './actionNames';

describe('Common reducer', () => {
  const initialState = {
    notification: {
      error: {},
      success: {},
    },
    ui: {
      loading: false,
    },
  };

  it('will return the initial state', () => {
    expect(CommonReducers(initialState, { type: 'a type' } as any)).toEqual({
      notification: {
        error: {},
        success: {},
      },
      ui: {
        loading: false,
      },
    });
  });

  it('will return the COMMON_UI_LOADING_STARTED loading state', () => {
    expect(
      CommonReducers(initialState, {
        type: ActionNames.COMMON_UI_LOADING_STARTED,
      } as any)
    ).toEqual({
      notification: {
        error: {},
        success: {},
      },
      ui: {
        loading: true,
      },
    });
  });

  it('will return the COMMON_UI_LOADING_FINISHED loading state', () => {
    const mockedState = {
      notification: {
        error: {},
        success: {},
      },
      ui: {
        loading: true,
      },
    };

    expect(
      CommonReducers(mockedState, {
        type: ActionNames.COMMON_UI_LOADING_FINISHED,
      } as any)
    ).toEqual({
      notification: {
        error: {},
        success: {},
      },
      ui: {
        loading: false,
      },
    });
  });

  it('will return the COMMON_NOTIFICATION_SET_MESSAGE state', () => {
    expect(
      CommonReducers(initialState, {
        type: ActionNames.COMMON_NOTIFICATION_SET_MESSAGE,
        payload: { messageType: 'error', data: { message: 'a message' } },
      })
    ).toEqual({
      notification: {
        error: { message: 'a message' },
        success: {},
      },
      ui: {
        loading: false,
      },
    });
  });

  it('will return the COMMON_NOTIFICATION_CLEAR_MESSAGE cleared state', () => {
    const mockedState = {
      notification: {
        error: { message: 'a message' },
        success: {},
      },
      ui: {
        loading: false,
      },
    };

    expect(
      CommonReducers(mockedState, {
        type: ActionNames.COMMON_NOTIFICATION_CLEAR_MESSAGE,
      } as any)
    ).toEqual({
      notification: {
        error: {},
        success: {},
      },
      ui: {
        loading: false,
      },
    });
  });
});

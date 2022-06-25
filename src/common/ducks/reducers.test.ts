import CommonReducers from './reducers';
import ActionNames from './actionNames';

describe('Common reducer', () => {
  const initialState = {
    ui: {
      loading: false,
    },
  };

  it('will return the initial state', () => {
    expect(CommonReducers(initialState, { type: 'a type' } as any)).toEqual({
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
      ui: {
        loading: true,
      },
    });
  });

  it('will return the COMMON_UI_LOADING_FINISHED loading state', () => {
    const mockedState = {
      ui: {
        loading: true,
      },
    };

    expect(
      CommonReducers(mockedState, {
        type: ActionNames.COMMON_UI_LOADING_FINISHED,
      } as any)
    ).toEqual({
      ui: {
        loading: false,
      },
    });
  });
});

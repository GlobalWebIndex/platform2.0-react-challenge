import CommonReducers from './reducers';
import ActionNames from './actionNames';

describe('Common reducer', () => {
  const initialState = {
    cats: { data: [], status: '' },
  };

  it('will return the initial state', () => {
    expect(CommonReducers(initialState, { type: 'a type' } as any)).toEqual({
      cats: { data: [], status: '' },
    });
  });

  it('will return the FETCH_HOME_CATS_REQUESTED state', () => {
    expect(
      CommonReducers(initialState, {
        type: ActionNames.FETCH_HOME_CATS_REQUESTED,
      } as any)
    ).toEqual({
      cats: {
        data: [],
        status: 'PENDING',
      },
    });
  });

  it('will return the FETCH_HOME_CATS_SUCCEDED state', () => {
    expect(
      CommonReducers(initialState, {
        type: ActionNames.FETCH_HOME_CATS_SUCCEDED,
        payload: { data: [{ image: '123' }] },
      } as any)
    ).toEqual({
      cats: {
        data: [{ image: '123' }],
        status: 'SUCCESS',
      },
    });
  });

  it('will return the FETCH_HOME_CATS_FAILED state', () => {
    expect(
      CommonReducers(initialState, {
        type: ActionNames.FETCH_HOME_CATS_FAILED,
      } as any)
    ).toEqual({
      cats: {
        data: [],
        status: 'FAILURE',
      },
    });
  });
});

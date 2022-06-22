import CommonReducers from './reducers';
import ActionNames from './actionNames';

describe('Common reducer', () => {
  const initialState = {
    cats: {
      data: [],
      status: '',
      details: { data: {}, status: '' },
      favorite: { status: '' },
    },
  };

  it('will return the initial state', () => {
    expect(CommonReducers(initialState, { type: 'a type' } as any)).toEqual({
      cats: {
        data: [],
        status: '',
        details: { data: {}, status: '' },
        favorite: { status: '' },
      },
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
        details: { data: {}, status: '' },
        favorite: { status: '' },
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
        details: { data: {}, status: '' },
        favorite: { status: '' },
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
        details: { data: {}, status: '' },
        favorite: { status: '' },
      },
    });
  });

  it('will return the FETCH_CAT_INFO_REQUESTED state', () => {
    expect(
      CommonReducers(initialState, {
        type: ActionNames.FETCH_CAT_INFO_REQUESTED,
      } as any)
    ).toEqual({
      cats: {
        data: [],
        details: { data: {}, status: 'PENDING' },
        status: '',
        favorite: { status: '' },
      },
    });
  });

  it('will return the FETCH_CAT_INFO_SUCCEDED state', () => {
    expect(
      CommonReducers(initialState, {
        type: ActionNames.FETCH_CAT_INFO_SUCCEDED,
        payload: { data: { image: '123' } },
      } as any)
    ).toEqual({
      cats: {
        data: [],
        status: '',
        details: { data: { image: '123' }, status: 'SUCCESS' },
        favorite: { status: '' },
      },
    });
  });

  it('will return the FETCH_CAT_INFO_FAILED state', () => {
    expect(
      CommonReducers(initialState, {
        type: ActionNames.FETCH_CAT_INFO_FAILED,
      } as any)
    ).toEqual({
      cats: {
        data: [],
        details: { data: {}, status: 'FAILURE' },
        status: '',
        favorite: { status: '' },
      },
    });
  });

  it('will return the MARK_CAT_FAVORITE_REQUESTED state', () => {
    expect(
      CommonReducers(initialState, {
        type: ActionNames.MARK_CAT_FAVORITE_REQUESTED,
      } as any)
    ).toEqual({
      cats: {
        data: [],
        details: { data: {}, status: '' },
        status: '',
        favorite: { status: 'PENDING' },
      },
    });
  });

  it('will return the MARK_CAT_FAVORITE_SUCCEDED state', () => {
    expect(
      CommonReducers(initialState, {
        type: ActionNames.MARK_CAT_FAVORITE_SUCCEDED,
        payload: {},
      } as any)
    ).toEqual({
      cats: {
        data: [],
        status: '',
        details: { data: {}, status: '' },
        favorite: { status: 'SUCCESS' },
      },
    });
  });

  it('will return the MARK_CAT_FAVORITE_FAILED state', () => {
    expect(
      CommonReducers(initialState, {
        type: ActionNames.MARK_CAT_FAVORITE_FAILED,
      } as any)
    ).toEqual({
      cats: {
        data: [],
        details: { data: {}, status: '' },
        status: '',
        favorite: { status: 'FAILURE' },
      },
    });
  });
});

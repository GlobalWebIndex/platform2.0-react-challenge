import CommonReducers from './reducers';
import ActionNames from './actionNames';

describe('Common reducer', () => {
  const initialState = {
    favorites: { data: [], status: '', delete: { status: '' } },
  };

  it('will return the initial state', () => {
    expect(CommonReducers(initialState, { type: 'a type' })).toEqual({
      favorites: { data: [], status: '', delete: { status: '' } },
    });
  });

  it('will return the FETCH_FAVORITES_REQUESTED state', () => {
    expect(
      CommonReducers(initialState, {
        type: ActionNames.FETCH_FAVORITES_REQUESTED,
      })
    ).toEqual({
      favorites: {
        data: [],
        status: 'PENDING',
        delete: { status: '' },
      },
    });
  });

  it('will return the FETCH_FAVORITES_SUCCEDED state', () => {
    expect(
      CommonReducers(initialState, {
        type: ActionNames.FETCH_FAVORITES_SUCCEDED,
        payload: {
          data: [{ id: 'abys', life_span: '14 - 15', name: 'Abyssinian' }],
        },
      } as any)
    ).toEqual({
      favorites: {
        data: [{ id: 'abys', life_span: '14 - 15', name: 'Abyssinian' }],
        status: 'SUCCESS',
        delete: { status: '' },
      },
    });
  });

  it('will return the FETCH_FAVORITES_FAILED state', () => {
    expect(
      CommonReducers(initialState, {
        type: ActionNames.FETCH_FAVORITES_FAILED,
      } as any)
    ).toEqual({
      favorites: {
        data: [],
        status: 'FAILURE',
        delete: { status: '' },
      },
    });
  });

  it('will return the DELETE_FAVORITE_REQUESTED state', () => {
    expect(
      CommonReducers(initialState, {
        type: ActionNames.DELETE_FAVORITE_REQUESTED,
      } as any)
    ).toEqual({
      favorites: {
        data: [],
        status: '',
        delete: { status: 'PENDING' },
      },
    });
  });

  it('will return the DELETE_FAVORITE_SUCCEDED state', () => {
    expect(
      CommonReducers(initialState, {
        type: ActionNames.DELETE_FAVORITE_SUCCEDED,
        payload: {},
      } as any)
    ).toEqual({
      favorites: {
        data: [],
        status: '',
        delete: { status: 'SUCCESS' },
      },
    });
  });

  it('will return the DELETE_FAVORITE_FAILED state', () => {
    expect(
      CommonReducers(initialState, {
        type: ActionNames.DELETE_FAVORITE_FAILED,
      } as any)
    ).toEqual({
      favorites: {
        data: [],
        status: '',
        delete: { status: 'FAILURE' },
      },
    });
  });
});

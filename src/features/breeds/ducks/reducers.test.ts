import CommonReducers from './reducers';
import ActionNames from './actionNames';

describe('Common reducer', () => {
  const initialState: any = {
    breeds: { data: [], status: '' },
  };

  it('will return the initial state', () => {
    expect(CommonReducers(initialState, { type: 'a type' } as any)).toEqual({
      breeds: { data: [], status: '' },
    });
  });

  it('will return the FETCH_BREEDS_REQUESTED state', () => {
    expect(
      CommonReducers(initialState, {
        type: ActionNames.FETCH_BREEDS_REQUESTED,
      } as any)
    ).toEqual({
      breeds: {
        data: [],
        status: 'PENDING',
      },
    });
  });

  it('will return the FETCH_BREEDS_SUCCEDED state', () => {
    expect(
      CommonReducers(initialState, {
        type: ActionNames.FETCH_BREEDS_SUCCEDED,
        payload: {
          data: [{ id: 'abys', life_span: '14 - 15', name: 'Abyssinian' }],
        },
      } as any)
    ).toEqual({
      breeds: {
        data: [{ id: 'abys', life_span: '14 - 15', name: 'Abyssinian' }],
        status: 'SUCCESS',
      },
    });
  });

  it('will return the FETCH_BREEDS_FAILED state', () => {
    expect(
      CommonReducers(initialState, {
        type: ActionNames.FETCH_BREEDS_FAILED,
      } as any)
    ).toEqual({
      breeds: {
        data: [],
        status: 'FAILURE',
      },
    });
  });

  it('will return the FETCH_BREED_CATS_REQUESTED state', () => {
    expect(
      CommonReducers(initialState, {
        type: ActionNames.FETCH_BREED_CATS_REQUESTED,
      } as any)
    ).toEqual({
      breeds: {
        data: [],
        cats: [],
        status: 'PENDING',
      },
    });
  });

  it('will return the FETCH_BREED_CATS_SUCCEDED state', () => {
    expect(
      CommonReducers(initialState, {
        type: ActionNames.FETCH_BREED_CATS_SUCCEDED,
        payload: {
          data: [{ id: 'abc', image: '123' }],
        },
      } as any)
    ).toEqual({
      breeds: {
        cats: [{ id: 'abc', image: '123' }],
        data: [],
        status: 'SUCCESS',
      },
    });
  });

  it('will return the FETCH_BREED_CATS_FAILED state', () => {
    expect(
      CommonReducers(initialState, {
        type: ActionNames.FETCH_BREED_CATS_FAILED,
      } as any)
    ).toEqual({
      breeds: {
        data: [],
        status: 'FAILURE',
      },
    });
  });
});

import ActionCreators from './actionCreators';
import ActionNames from './actionNames';

describe('Home action creators', () => {
  it('will return getCats type and paylod', () => {
    expect(ActionCreators.getCats({ page: 0, limit: 5 })).toEqual({
      type: ActionNames.FETCH_HOME_CATS_REQUESTED,
      payload: {
        page: 0,
        limit: 5,
      },
    });
  });

  it('will return catsSucceeded type and paylod', () => {
    const mockedData = [{ image: '123' }];

    expect(ActionCreators.catsSucceeded(mockedData)).toEqual({
      type: ActionNames.FETCH_HOME_CATS_SUCCEDED,
      payload: { data: mockedData },
    });
  });

  it('will return catsFailed type and paylod', () => {
    expect(ActionCreators.catsFailed()).toEqual({
      type: ActionNames.FETCH_HOME_CATS_FAILED,
      payload: {},
    });
  });
});

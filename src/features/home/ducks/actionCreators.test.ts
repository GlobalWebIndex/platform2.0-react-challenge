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
    const mockedData = [{ image: '123', breeds: [], id: '123', url: 'a_url' }];

    expect(ActionCreators.catsSucceeded({ data: mockedData, page: 0 })).toEqual(
      {
        type: ActionNames.FETCH_HOME_CATS_SUCCEDED,
        payload: { data: mockedData, page: 0 },
      }
    );
  });

  it('will return catsFailed type and paylod', () => {
    expect(ActionCreators.catsFailed()).toEqual({
      type: ActionNames.FETCH_HOME_CATS_FAILED,
      payload: {},
    });
  });

  it('will return getCatById type and paylod', () => {
    expect(ActionCreators.getCatById(123)).toEqual({
      type: ActionNames.FETCH_CAT_INFO_REQUESTED,
      payload: {
        id: 123,
      },
    });
  });

  it('will return catByIdSucceeded type and paylod', () => {
    const mockedData = { image: '123', breeds: [], id: '123', url: 'a_url' };

    expect(ActionCreators.catByIdSucceeded(mockedData)).toEqual({
      type: ActionNames.FETCH_CAT_INFO_SUCCEDED,
      payload: { data: mockedData },
    });
  });

  it('will return catByIdFailed type and paylod', () => {
    expect(ActionCreators.catByIdFailed()).toEqual({
      type: ActionNames.FETCH_CAT_INFO_FAILED,
      payload: {},
    });
  });

  it('will return markCatFavorite type and paylod', () => {
    expect(ActionCreators.markCatFavorite({ imageId: '123' })).toEqual({
      type: ActionNames.MARK_CAT_FAVORITE_REQUESTED,
      payload: {
        imageId: '123',
      },
    });
  });

  it('will return markCatFavoriteSucceeded type and paylod', () => {
    expect(ActionCreators.markCatFavoriteSucceeded()).toEqual({
      type: ActionNames.MARK_CAT_FAVORITE_SUCCEDED,
      payload: {},
    });
  });

  it('will return markCatFavoriteFailed type and paylod', () => {
    expect(ActionCreators.markCatFavoriteFailed()).toEqual({
      type: ActionNames.MARK_CAT_FAVORITE_FAILED,
      payload: {},
    });
  });
});

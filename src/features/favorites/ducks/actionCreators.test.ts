import ActionCreators from './actionCreators';
import ActionNames from './actionNames';

describe('Favorites action creators', () => {
  it('will return getFavorites type and paylod', () => {
    expect(ActionCreators.getFavorites({ page: 0, limit: 5 })).toEqual({
      type: ActionNames.FETCH_FAVORITES_REQUESTED,
      payload: {
        page: 0,
        limit: 5,
      },
    });
  });

  it('will return favoritesSucceeded type and paylod', () => {
    const mockedData = [
      {
        id: '833',
        user_id: '4',
        image_id: '1ud',
        sub_id: '',
        created_at: '2018-10-24T08:35:48.000Z',
        image: {
          id: '1ud',
          url: 'https://cdn2.thecatapi.com/images/1ud.jpg',
        },
      },
    ];

    expect(ActionCreators.favoritesSucceeded({ data: mockedData })).toEqual({
      type: ActionNames.FETCH_FAVORITES_SUCCEDED,
      payload: { data: mockedData },
    });
  });

  it('will return favoritesFailed type and paylod', () => {
    expect(ActionCreators.favoritesFailed()).toEqual({
      type: ActionNames.FETCH_FAVORITES_FAILED,
      payload: {},
    });
  });

  it('will return deleteFavorite type and paylod', () => {
    expect(ActionCreators.deleteFavorite('123')).toEqual({
      type: ActionNames.DELETE_FAVORITE_REQUESTED,
      payload: {
        favoriteId: '123',
      },
    });
  });

  it('will return deleteFavoriteSucceeded type and paylod', () => {
    expect(ActionCreators.deleteFavoriteSucceeded()).toEqual({
      type: ActionNames.DELETE_FAVORITE_SUCCEDED,
      payload: {},
    });
  });

  it('will return deleteFavoriteFailed type and paylod', () => {
    expect(ActionCreators.deleteFavoriteFailed()).toEqual({
      type: ActionNames.DELETE_FAVORITE_FAILED,
      payload: {},
    });
  });
});

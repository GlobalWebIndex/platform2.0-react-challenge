import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Constants from 'common/constants';
import ActionCreators from 'features/favorites/ducks/actionCreators';
import { IFavorite, IFavoritesScreen } from 'features/favorites/types';
import { RootState } from 'state/types';
import Loader from 'common/components/Loader';
import Card from './Card';
import PageTitle from 'common/components/PageTitle';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 24px;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 900px;
  max-height: 100%;
  min-height: 400px;
  align-items: center;
  justify-content: center;
  align-content: flex-start;
  position: relative;
`;

export const Favorites = ({
  data,
  loading,
  favoritesRequested,
  deleteFavorite,
}: IFavoritesScreen) => {
  const { data: favoritesData = [] } = data;

  const hasFavorites = favoritesData.length > 0;

  React.useEffect(() => {
    if (!hasFavorites) {
      favoritesRequested({
        page: Constants.PAGINATION.PAGE,
        limit: 50,
      });
    }
  }, [favoritesRequested, hasFavorites]);

  return (
    <Wrapper>
      <PageTitle text="List of 🐈🐈🐈🐈  you 💖💖💖💖" />
      <CardsWrapper>
        {hasFavorites ? (
          <CardsWrapper>
            {favoritesData.map((favorite: IFavorite) => (
              <Card
                key={favorite.id}
                favorite={favorite}
                onDelete={deleteFavorite}
              />
            ))}
          </CardsWrapper>
        ) : (
          <span>There are no favorite cats yet</span>
        )}
        {loading && <Loader />}
      </CardsWrapper>
    </Wrapper>
  );
};

export const mapStateToProps = (state: RootState) => {
  return {
    loading: state.common.ui.loading,
    data: state.data.favorites.favorites,
  };
};

export const mapDispatchToProps = (dipatch: Dispatch<any>) => ({
  favoritesRequested: ({ page, limit }: { page: number; limit: number }) =>
    dipatch(ActionCreators.getFavorites({ page, limit })),
  deleteFavorite: (id: string) => dipatch(ActionCreators.deleteFavorite(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);

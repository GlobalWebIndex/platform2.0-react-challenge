import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

import { RootState } from 'state/types';
import Constants from 'common/constants';
import { BreedsActionCreators } from 'features/breeds/ducks';
import { IBreedsScreen } from 'features/breeds/types';
import MoreButton from 'common/components/MoreButton';
import BreedsList from './BreedsList';
import PageTitle from 'common/components/PageTitle';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 24px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Breeds = ({ data, loading, breedsRequested }: IBreedsScreen) => {
  const [breedsListPager, setBreedsListPager] = React.useState(
    Constants.PAGINATION.PAGE
  );

  const { data: breedsData = [] } = data;

  React.useEffect(() => {
    if (breedsData.length === 0) {
      breedsRequested({
        page: Constants.PAGINATION.PAGE,
        limit: Constants.PAGINATION.LIMIT,
      });

      setBreedsListPager(Constants.PAGINATION.PAGE + 1);
    }
  }, [breedsRequested, breedsData.length]);

  const handleMoreBreedsClick = React.useCallback(() => {
    breedsRequested({
      page: breedsListPager + 1,
      limit: Constants.PAGINATION.LIMIT,
    });

    setBreedsListPager(breedsListPager + 1);
  }, [breedsListPager, breedsRequested]);

  return (
    <Wrapper>
      <PageTitle text="List of 🐈🐈🐈🐈 breeds" />
      <BreedsList breeds={breedsData} />
      <MoreButton
        label="Fetch more breeds"
        loading={loading}
        onClick={handleMoreBreedsClick}
      />
      <Outlet />
    </Wrapper>
  );
};

export const mapStateToProps = (state: RootState) => {
  return {
    loading: state.common.ui.loading,
    data: state.data.breeds.breeds,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    breedsRequested: ({ page, limit }: { page: number; limit: number }) =>
      dispatch(
        BreedsActionCreators.getBreeds({
          page,
          limit,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Breeds);

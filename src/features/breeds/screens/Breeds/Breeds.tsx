import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

import { RootState } from 'state/types';
import Constants from 'common/constants';
import { BreedsActionCreators } from 'features/breeds/ducks';
import { CommonActionCreators } from 'common/ducks';
import { IBreedsScreen } from 'features/breeds/types';
import BreedsList from './BreedsList';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 24px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Breeds = ({ breedsRequested, data }: IBreedsScreen) => {
  const { data: breedsData = [] } = data;

  React.useEffect(() => {
    if (breedsData.length === 0) {
      breedsRequested({
        page: Constants.PAGINATION.PAGE,
        limit: 100,
      });
    }
  }, [breedsRequested, breedsData.length]);

  return (
    <Wrapper>
      <span>I am Breeds</span>
      <BreedsList breeds={breedsData} />
      <Outlet />
    </Wrapper>
  );
};

export const mapStateToProps = (state: RootState) => {
  return {
    notification: state.common.notification,
    data: state.data.breeds.breeds,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    clearNotificationMessage: () =>
      dispatch(CommonActionCreators.clearNotificationMessage()),
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

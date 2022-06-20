import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Outlet, useNavigate } from 'react-router-dom';

import { CommonActionCreators } from 'common/ducks';
import Constants from 'common/constants';
import { RootState } from 'state/types';
import { HomeCatsActionCreators } from 'features/home/ducks';
import { IHomeScreen, ICat } from 'features/home/types';
import Card from './Card';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 24px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 800px;
  height: 100%;
  align-items: center;
  justify-content: center;
  align-content: flex-start;
`;

const MoreButton = styled.div`
  background-color: red;
  color: white;
  width: 800px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 12px 12px;
`;

export const Home = ({ catsRequested, data }: IHomeScreen) => {
  const [catsListPager, setCatsListPager] = React.useState(
    Constants.PAGINATION.PAGE
  );

  const { data: catsData = [] } = data;

  React.useEffect(() => {
    if (catsData.length === 0) {
      catsRequested({
        page: Constants.PAGINATION.PAGE,
        limit: Constants.PAGINATION.LIMIT,
      });

      setCatsListPager(Constants.PAGINATION.PAGE + 1);
    }
  }, [catsRequested, catsData.length]);

  const handleMoreCatsClick = React.useCallback(() => {
    catsRequested({
      page: catsListPager + 1,
      limit: Constants.PAGINATION.LIMIT,
    });

    setCatsListPager(catsListPager + 1);
  }, [catsListPager, catsRequested]);

  const handleSelectCat = (cat: ICat) => {
    navigate(`cats/${cat.id}`);
  };

  const navigate = useNavigate();

  return (
    <Wrapper>
      <span>I am Home</span>
      <CardsWrapper>
        {catsData.map((catItem: ICat) => (
          <Card key={catItem.id} cat={catItem} onSelect={handleSelectCat} />
        ))}
        <MoreButton onClick={handleMoreCatsClick}>
          <span>Fetch more cats</span>
        </MoreButton>
      </CardsWrapper>
      <Outlet />
    </Wrapper>
  );
};

export const mapStateToProps = (state: RootState) => {
  return {
    notification: state.common.notification,
    data: state.data.home.cats,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    clearNotificationMessage: () =>
      dispatch(CommonActionCreators.clearNotificationMessage()),
    catsRequested: ({ page, limit }: { page: number; limit: number }) =>
      dispatch(
        HomeCatsActionCreators.getCats({
          page,
          limit,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

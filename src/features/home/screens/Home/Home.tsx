import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Outlet, useNavigate } from 'react-router-dom';

import Constants from 'common/constants';
import Loader from 'common/components/Loader';
import MoreButton from 'common/components/MoreButton';
import { RootState } from 'state/types';
import { HomeCatsActionCreators } from 'features/home/ducks';
import { IHomeScreen, ICat } from 'features/home/types';
import ImageCard from 'common/components/ImageCard';
import PageTitle from 'common/components/PageTitle';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 24px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

export const Home = ({ data, loading, catsRequested }: IHomeScreen) => {
  const [catsListPager, setCatsListPager] = React.useState(
    Constants.PAGINATION.PAGE
  );

  const navigate = useNavigate();

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

  return (
    <Wrapper>
      <PageTitle text="List of 🐈🐈🐈🐈 images" />
      <CardsWrapper>
        {catsData.map((catItem: ICat) => (
          <ImageCard
            key={catItem.id}
            cat={catItem}
            onSelect={handleSelectCat}
          />
        ))}
        <MoreButton
          loading={loading}
          label="Fetch more cats"
          onClick={handleMoreCatsClick}
        />
        {loading && <Loader />}
      </CardsWrapper>
      <Outlet />
    </Wrapper>
  );
};

export const mapStateToProps = (state: RootState) => {
  return {
    loading: state.common.ui.loading,
    data: state.data.home.cats,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
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

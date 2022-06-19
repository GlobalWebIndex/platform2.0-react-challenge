import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Dispatch } from 'react';

import { CommonActionCreators } from 'common/ducks';
import { RootState } from 'state/types';
import { HomeCatsActionCreators } from 'features/home/ducks';
import { IHomeScreen, ICat } from 'features/home/types';
import Card from './Card';
import CatDetailsModal from './CatDetailsModal';

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
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const Home = ({ catsRequested, data }: IHomeScreen) => {
  const [selectedCat, setSelectedCat] = React.useState({} as ICat);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    catsRequested({ page: 0, limit: 10 });
  }, [catsRequested]);

  const { data: catsData = [] } = data;

  const handleSelectCat = (cat: ICat) => {
    setSelectedCat(cat);
    setIsOpen(true);
  };

  const handleDismiss = () => {
    setIsOpen(false);
  };

  return (
    <Wrapper>
      <span>I am Home</span>
      <CardsWrapper>
        {catsData.map((catItem: ICat) => (
          <Card key={catItem.id} cat={catItem} onSelect={handleSelectCat} />
        ))}
      </CardsWrapper>
      <CatDetailsModal
        selectedCat={selectedCat}
        isOpen={isOpen}
        onDismiss={handleDismiss}
      />
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

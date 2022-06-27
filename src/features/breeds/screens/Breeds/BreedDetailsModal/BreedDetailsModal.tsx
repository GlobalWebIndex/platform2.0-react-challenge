import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { RootState } from 'state/types';
import Constants from 'common/constants';
import { BreedsActionCreators } from 'features/breeds/ducks';
import Modal from 'common/components/Modal';
import Body from './Body';
import { IBreedDetailsModal } from 'features/breeds/types';
import { ICat } from 'features/home/types';

const BreedDetailsModal = ({
  breed,
  loading,
  getCatsByBreedName,
}: IBreedDetailsModal) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [catsListPager, setCatsListPager] = React.useState(
    Constants.PAGINATION.PAGE
  );

  const { breedName = '' } = useParams();
  const navigate = useNavigate();

  const { cats: breedCats = [{ breeds: [{ name: '' }] }] } = breed;

  const modalTilte = breedCats[0]?.breeds[0]?.name
    ? `${breedCats[0]?.breeds[0]?.name} breed cats`
    : 'Breed cats';

  React.useEffect(() => {
    if (breedName) {
      getCatsByBreedName({
        breedName,
        page: Constants.PAGINATION.PAGE,
        limit: Constants.PAGINATION.LIMIT,
      });

      setCatsListPager(Constants.PAGINATION.PAGE + 1);
    }
  }, [getCatsByBreedName, breedName]);

  const handleRefreshCatsClick = React.useCallback(() => {
    getCatsByBreedName({
      breedName,
      page: catsListPager,
      limit: Constants.PAGINATION.LIMIT,
    });

    setCatsListPager(catsListPager + 1);
  }, [catsListPager, breedName, getCatsByBreedName]);

  const handleDismiss = () => {
    setIsOpen(false);
    navigate('/breeds');
  };

  return (
    <Modal
      title={modalTilte}
      body={
        <Body
          cats={breedCats as ICat[]}
          loading={loading}
          onRefreshCatsClick={handleRefreshCatsClick}
        />
      }
      isOpen={isOpen}
      onDismiss={handleDismiss}
    />
  );
};

export const mapStateToProps = (state: RootState) => {
  return {
    loading: state.common.ui.loading,
    breed: state.data.breeds.breeds,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    getCatsByBreedName: ({
      breedName,
      page,
      limit,
    }: {
      breedName: string;
      page: number;
      limit: number;
    }) =>
      dispatch(
        BreedsActionCreators.getCatsByBreed({
          breedName,
          page,
          limit,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BreedDetailsModal);

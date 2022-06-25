import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { RootState } from 'state/types';
import { BreedsActionCreators } from 'features/breeds/ducks';
import Modal from 'common/components/Modal';
import Body from './Body';
import { IBreedDetailsModal } from 'features/breeds/types';

const BreedDetailsModal = ({
  breed,
  loading,
  getCatsByBreedName,
}: IBreedDetailsModal) => {
  const [isOpen, setIsOpen] = React.useState(true);

  const { breedName = '' } = useParams();
  const navigate = useNavigate();

  const { cats: breedCats = [] } = breed;

  const modalTilte = breedCats[0]?.breeds[0]?.name
    ? `${breedCats[0]?.breeds[0]?.name} breed cats`
    : 'Breed cats';

  React.useEffect(() => {
    if (breedName) {
      getCatsByBreedName(breedName);
    }
  }, [getCatsByBreedName, breedName]);

  const handleDismiss = () => {
    setIsOpen(false);
    navigate('/breeds');
  };

  return (
    <Modal
      title={modalTilte}
      body={<Body cats={breedCats} loading={loading} />}
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
    getCatsByBreedName: (breedName: string) =>
      dispatch(BreedsActionCreators.getCatsByBreed(breedName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BreedDetailsModal);

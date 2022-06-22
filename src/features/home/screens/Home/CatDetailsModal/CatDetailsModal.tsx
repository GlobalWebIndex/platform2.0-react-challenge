import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { RootState } from 'state/types';
import { HomeCatsActionCreators } from 'features/home/ducks';
import Modal from 'common/components/Modal';
import { ICatDetailsModal } from 'features/home/types';

const CatDetailsModal = ({ getCatById }: ICatDetailsModal) => {
  const [isOpen, setIsOpen] = React.useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (id) {
      getCatById(id);
    }
  }, [id, getCatById]);

  const handleDismiss = () => {
    setIsOpen(false);
    navigate('/');
  };

  return (
    <Modal
      title="a title"
      body={id}
      isOpen={isOpen}
      onDismiss={handleDismiss}
    />
  );
};

export const mapStateToProps = (state: RootState) => {
  return {
    loading: state.common.ui.loading,
    cat: state.data.home.cats.details,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    getCatById: (id: number | string) =>
      dispatch(HomeCatsActionCreators.getCatById(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CatDetailsModal);

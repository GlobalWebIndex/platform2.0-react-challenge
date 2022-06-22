import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { RootState } from 'state/types';
import Constants from 'common/constants';
import { HomeCatsActionCreators } from 'features/home/ducks';
import Modal from 'common/components/Modal';
import { ICatDetailsModal } from 'features/home/types';
import Body from './Body';

const CatDetailsModal = ({ cat, getCatById }: ICatDetailsModal) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [isLoading, setisLoading] = React.useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  const { data: catData = {}, status = '' } = cat;

  React.useEffect(() => {
    if (id) {
      getCatById(id);
    }
  }, [id, getCatById]);

  const handleDismiss = () => {
    setIsOpen(false);
    navigate('/');
  };

  React.useEffect(() => {
    if (
      [
        Constants.RESPONSE_STATUS.SUCCESS,
        Constants.RESPONSE_STATUS.FAILURE,
      ].includes(status)
    ) {
      setisLoading(false);
    }
  }, [status]);

  return (
    <Modal
      title="a title"
      body={<Body loading={isLoading} cat={catData} />}
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

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Modal from 'common/components/Modal';

const CatDetailsModal = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

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

export default CatDetailsModal;

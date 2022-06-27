import React from 'react';
import styled from 'styled-components';

import { IFavorite } from 'features/favorites/types';
import IconButton from 'common/components/IconButton';
import Dialog from 'common/components/Dialog';
import { Colors } from 'theme';

const Wrapper = styled.div`
  background-color: ${Colors.white};
  width: 180px;
  height: 240px;
  border-radius: 16px;
  overflow: hidden;
  flew-wrap: wrap;
  margin: 12px;
`;

const ImgWrapper = styled.div`
  width: 180px;
  height: 180px;
`;

const Img = styled.img`
  width: 180px;
  height: 180px;
  object-fit: cover;
`;

interface Props {
  favorite: IFavorite;
  onDelete: (id: string) => void;
}

const Card = ({ favorite, onDelete }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleDelete = () => {
    onDelete(favorite.id);
    setIsOpen(false);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <Wrapper className="flex flex-col items-center justify-between">
      <ImgWrapper>
        <Img src={favorite?.image?.url} alt="a cat" />
      </ImgWrapper>
      <div className="flex items-center justify-center w-full h-24">
        <IconButton icon="delete" onClick={handleOpenModal} />
      </div>
      <Dialog
        title="Delete favorite"
        description="Are you sure you want to delete this favorite?"
        isOpen={isOpen}
        onConfirm={handleDelete}
        onDismiss={handleCloseModal}
      />
    </Wrapper>
  );
};

export default Card;

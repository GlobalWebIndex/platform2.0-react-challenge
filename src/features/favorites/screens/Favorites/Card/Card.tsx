import styled from 'styled-components';

import { IFavorite } from 'features/favorites/types';
import IconButton from 'common/components/IconButton';
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
  const handleDelete = () => {
    onDelete(favorite.id);
  };
  return (
    <Wrapper className="flex flex-col items-center justify-between">
      <ImgWrapper>
        <Img src={favorite?.image?.url} alt="a cat" />
      </ImgWrapper>
      <div className="flex items-center justify-center bg-red-400 w-full h-24">
        <IconButton icon="delete" onClick={handleDelete} />
      </div>
    </Wrapper>
  );
};

export default Card;

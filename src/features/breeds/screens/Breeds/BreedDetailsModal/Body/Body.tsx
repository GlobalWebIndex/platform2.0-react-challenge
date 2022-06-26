import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Loader from 'common/components/Loader';
import ImageCard from 'common/components/ImageCard';
import { ICat } from 'features/home/types';
import MoreButton from 'common/components/MoreButton';

const MatrixWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 800px;
  max-height: 100%;
  min-height: 400px;
  align-items: center;
  justify-content: center;
  align-content: flex-start;
  position: relative;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 24px;
`;

interface Props {
  cats: ICat[];
  loading: boolean;
  onMoreCatsClick: () => void;
}

const Body = ({ cats, loading = false, onMoreCatsClick }: Props) => {
  const navigate = useNavigate();

  const handleSelectCat = (cat: ICat) => {
    navigate(`/cats/${cat.id}`);
  };

  return (
    <Wrapper>
      <MatrixWrapper>
        {cats.map((catItem: ICat) => (
          <ImageCard
            key={catItem.id}
            cat={catItem}
            onSelect={handleSelectCat}
          />
        ))}
      </MatrixWrapper>
      <MoreButton
        loading={loading}
        label="Fetch more cats"
        onClick={onMoreCatsClick}
      />
      {loading && <Loader />}
    </Wrapper>
  );
};

export default Body;

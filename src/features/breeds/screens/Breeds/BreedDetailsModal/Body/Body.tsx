import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Loader from 'common/components/Loader';
import ImageCard from 'common/components/ImageCard';
import { ICat } from 'features/home/types';

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
`;

interface Props {
  cats: ICat[];
  loading: boolean;
}

const Body = ({ cats, loading = false }: Props) => {
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
      {loading && <Loader />}
    </Wrapper>
  );
};

export default Body;

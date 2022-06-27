import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Loader from 'common/components/Loader';
import ImageCard from 'common/components/ImageCard';
import { ICat } from 'features/home/types';
import MoreButton from 'common/components/MoreButton';
import Constants from 'common/constants';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 24px;
  min-width: 800px;
`;

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

interface Props {
  cats: ICat[];
  loading: boolean;
  onRefreshCatsClick: () => void;
}

const Body = ({ cats, loading = false, onRefreshCatsClick }: Props) => {
  const navigate = useNavigate();

  const handleSelectCat = (cat: ICat) => {
    navigate(`/cats/${cat.id}`);
  };

  const areΝοMoreCats =
    cats.length > 0 && cats.length < Constants.PAGINATION.LIMIT;

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
        {loading && <Loader />}
      </MatrixWrapper>
      <MoreButton
        loading={loading}
        disabled={areΝοMoreCats}
        label={areΝοMoreCats ? 'No more cats to show' : 'Refresh cats'}
        onClick={onRefreshCatsClick}
      />
    </Wrapper>
  );
};

export default Body;

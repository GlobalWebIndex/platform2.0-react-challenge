import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Loader from 'common/components/Loader';
import IconButton from 'common/components/IconButton';
import Button from 'common/components/Button';
import { ICat } from 'features/home/types';

const Wrapper = styled.div`
  height: 500px;
  display: flex;
`;

const ImgWrapper = styled.div`
  display: flex;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: 'contain';
`;

interface Props {
  loading: boolean;
  cat: ICat;
  onMarkCatFavorite: ({ imageId }: { imageId: string }) => void;
}

const Body = ({ cat, loading, onMarkCatFavorite }: Props) => {
  const [buttonText, setButtonText] = React.useState('Copy Url');

  const navigate = useNavigate();

  const hasBreeds = cat?.breeds?.length > 0;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);

    setButtonText('Copied!');

    setTimeout(() => setButtonText('CopyUrl'), 2000);
  };

  const handleBreedClick = (name: string) => {
    navigate(`/breeds/${name}`);
  };

  const handleFavoriteClick = () => {
    onMarkCatFavorite({ imageId: cat.id });
  };

  return (
    <Wrapper className="flex items-center justify-center flex-col w-full px-12">
      <ImgWrapper>
        <Img src={cat.url} alt="a cat" />
      </ImgWrapper>

      <div className="flex items-center justify-center flex-col w-3/4">
        <span className="flex items-start justify-start flex-col w-full mt-8">
          Breeds info
        </span>
        {hasBreeds ? (
          <div className="flex flex-wrap justify-center space-x-2">
            {cat.breeds.map((breed) => (
              <span
                className="px-4 py-2 rounded-full border border-gray-700 text-black-900 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-400 hover:bg-gray-300 transition duration-300 ease"
                key={breed.id}
                onClick={() => handleBreedClick(breed.name)}
              >
                {breed.name}
              </span>
            ))}
          </div>
        ) : (
          <span>No breed info available</span>
        )}
      </div>
      <div className="flex items-center justify-between row mx-4 mt-8 w-full">
        <div className="flex items-center justify-center w-1/2 h-12">
          <Button
            variant="secondary"
            text={buttonText}
            onClick={handleCopyUrl}
          />
        </div>
        <div className="flex items-center justify-center w-1/2 h-12">
          <IconButton icon="favorite" onClick={handleFavoriteClick} />
        </div>
      </div>
      {loading && <Loader />}
    </Wrapper>
  );
};

export default Body;

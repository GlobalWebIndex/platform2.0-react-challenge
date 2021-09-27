import { Routes } from 'constants/routes';
import React from 'react';
import { Copy, Heart } from 'react-feather';
import { useHistory } from 'react-router';
import { BreedType } from 'types/breeds';
import BreedDetails from './BreedDetails/BreedDetails';
import styles from './ModalContent.module.scss';

type Props = {
  id: string;
  source: string;
  breeds?: BreedType[];
  showCopied: boolean;
  isFavourite: boolean;
  onCopyClick: (url: string) => void;
  onFavouriteClick: (id: string) => void;
};

const ModalContent: React.FC<Props> = ({
  id,
  source,
  breeds = [],
  showCopied,
  isFavourite,
  onCopyClick,
  onFavouriteClick,
}) => {
  const history = useHistory();

  const onGoToBreedsClicked = () => {
    history.push(Routes.breeds.index);
  };

  const renderBreed = () => {
    if (breeds.length > 0) {
      return breeds.map((breed) => {
        return <BreedDetails name={breed.name} description={breed.description} onClick={onGoToBreedsClicked} />;
      });
    }

    return <h2>No breed description</h2>;
  };

  return (
    <div className={styles.content}>
      <img src={source} alt={source} />
      <div className={styles.icons__container}>
        <Heart onClick={() => onFavouriteClick(id)} fill={isFavourite ? 'red' : 'transparent'} />
        <Copy onClick={() => onCopyClick(source)} />
        {showCopied && <div>Successfully copied!</div>}
      </div>
      <div>{renderBreed()}</div>
    </div>
  );
};

export default ModalContent;

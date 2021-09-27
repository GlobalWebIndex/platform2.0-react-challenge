import React from 'react';
import { Heart } from 'react-feather';
import styles from './ImagesListItem.module.scss';

type Props = {
  id: string;
  source: string;
  alt: string;
  showFavouriteIcon?: boolean;
  onClick?: (id: string) => void;
  onFavouriteClick?: (id: string) => void;
};

const ImagesListItem: React.FC<Props> = ({ id, source, alt, showFavouriteIcon = false, onClick, onFavouriteClick }) => {
  const imageClickHandler = () => {
    if (onClick) {
      onClick(id);
    }
  };

  const favouriteClickHandler = () => {
    if (onFavouriteClick) {
      onFavouriteClick(id);
    }
  };

  return (
    <div className={styles.content}>
      <img className={styles.image} src={source} alt={alt} onClick={imageClickHandler} />
      {showFavouriteIcon && (
        <div className={styles['favourite-container']}>
          <Heart onClick={favouriteClickHandler} fill="red" />
        </div>
      )}
    </div>
  );
};

export default ImagesListItem;

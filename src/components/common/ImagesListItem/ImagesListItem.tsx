import React from 'react';
import { Heart } from 'react-feather';
import styles from './ImagesListItem.module.scss';

type Props = {
  id: string;
  source?: string;
  alt: string;
  showFavouriteIcon?: boolean;
  label?: string;
  onClick?: (id: string) => void;
  onFavouriteClick?: (id: string) => void;
};

const defaultImage = 'http://areaedu.com/areaedu/wp-content/uploads/2016/02/default-placeholder-300x300.png';

const ImagesListItem: React.FC<Props> = ({
  id,
  source = defaultImage,
  alt,
  showFavouriteIcon = false,
  label,
  onClick,
  onFavouriteClick,
}) => {
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
      {label && (
        <div className={styles.label}>
          <span>{label}</span>
        </div>
      )}
    </div>
  );
};

export default ImagesListItem;

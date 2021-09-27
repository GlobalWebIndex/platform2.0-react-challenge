import ImagesListItem from 'components/common/ImagesListItem/ImagesListItem';
import ImagesListWrapper from 'components/common/ImagesListWrapper/ImagesListWrapper';
import Spinner from 'components/common/Spinner/Spinner';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFavourite, getFavourites } from 'redux/favourites/actions';
import { allFavouritesSelector, favouritesLoadingSelector } from 'redux/favourites/selectors';

const Favourites = () => {
  const dispatch = useDispatch();
  const favourites = useSelector(allFavouritesSelector);
  const favouritesLoading = useSelector(favouritesLoadingSelector);

  useEffect(() => {
    dispatch(getFavourites());
  }, [dispatch]);

  const onFavouriteClick = (id: string) => {
    dispatch(deleteFavourite(id));
  };

  if (favouritesLoading) {
    return <Spinner />;
  }

  return (
    <ImagesListWrapper>
      {favourites.map((favourite) => {
        const { image } = favourite;
        return (
          <ImagesListItem
            key={favourite.id}
            id={favourite.id}
            source={image.url}
            alt={favourite.id}
            onFavouriteClick={onFavouriteClick}
            showFavouriteIcon
          />
        );
      })}
    </ImagesListWrapper>
  );
};

export default Favourites;

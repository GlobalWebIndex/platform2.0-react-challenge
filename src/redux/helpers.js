const formatFavourites = (favourites) => {
  const formattedFavourites = favourites.map((favourite) => (
    { id: favourite.id, image: favourite.image }));
  return formattedFavourites;
};

const updateCatsFavouriteId = (cats, favourites) => {
  if (favourites) {
    const favouriteIds = favourites.map((fav) => fav.id);
    const favouriteCatsIds = favourites.map((favourite) => favourite.image.id);

    return cats.map((cat) => (
      { ...cat, favouriteId: favouriteIds[favouriteCatsIds.indexOf(cat.id)] }
    ));
  }
  return cats;
};

export {
  formatFavourites,
  updateCatsFavouriteId,
};

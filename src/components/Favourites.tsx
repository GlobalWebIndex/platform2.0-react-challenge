import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import ImageList from '@material-ui/core/ImageList';

import { fetchAllFavourites } from '../api';
import { ImageGalleryItem, NoRecords, PageHeading, BackdropLoader } from './shared';
import { FavouriteCat } from '../types';
import { AppContext } from './AppContext';

import { generateUniqueKey } from '../helpers';

const Favourites: React.FC = () => {
  const [isFetching, toggleFetching] = useState<boolean>(false);
  const [favourites, setFavourites] = useState<FavouriteCat[]>([]);

  const navigate = useNavigate();
  const { id } = useParams();

  const location = useLocation() as { state: { deletedFavId: string } };

  const appContext = useContext(AppContext);
  const { toggleModal } = appContext;

  const initialRequest = async () => {
    toggleFetching(true);
    const data = await fetchAllFavourites();
    setFavourites(data);
    toggleFetching(false);
  };

  const refreshFavourites = (deletedId: string) => {
    toggleFetching(true);
    setFavourites([...favourites.filter((item) => item.id !== +deletedId)]);
    toggleFetching(false);
  };

  useEffect(() => {
    if (location?.state?.deletedFavId)
      refreshFavourites(location.state.deletedFavId);
  }, [location?.state?.deletedFavId]);

  useEffect(() => {
    if (id) toggleModal(true);
  }, [id]);

  useEffect(() => {
    initialRequest();
  }, []);

  return (
    <Box p={5}>
      <PageHeading title="Favourites Gallery" />

      {favourites.length > 0 ? (
        <ImageList rowHeight={200} cols={5}>
          {favourites.map(({ id: catID, image: { url } }) => (
            <ImageGalleryItem
              key={generateUniqueKey(catID.toString())}
              data={{ id: catID.toString(), url }}
              handleClick={(imgID) => {
                navigate(`/favourites/${imgID}`);
                toggleModal(true);
              }}
            />
          ))}
        </ImageList>
      ) : (
        <NoRecords />
      )}

      <BackdropLoader isFetching={isFetching} />
    </Box>
  );
};

export default Favourites;

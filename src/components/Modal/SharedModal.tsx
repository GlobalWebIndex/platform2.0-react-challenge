import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Box from '@material-ui/core/Box';
import ImageList from '@material-ui/core/ImageList';
import CircularProgress from '@material-ui/core/CircularProgress';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

import { fetchCatDetails, fetchFavouriteCat, fetchBreedInfo } from '../../api';
import BreedDetails from './BreedDetails';
import { CatDetails, FavouriteCat, SharedModalProps } from '../../types';
import { ImageGalleryItem, NoRecords } from '../shared';
import SharedDialogFooter from './SharedDialogFooter';
import SharedDialogHeader from './SharedDialogHeader';
import { generateUniqueKey } from '../../helpers';

const SharedModal: React.FC<SharedModalProps> = ({ isModalOpen, toggleModal }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [isFetching, toggleFetching] = useState(false);
  const [catData, setCatData] = useState<CatDetails | FavouriteCat | null>(null);
  const [comesFromFavs, toggleFavs] = useState<boolean>(false);
  const [comesFromImgs, toggleImgs] = useState<boolean>(false);
  const [comesFromBrds, toggleBreeds] = useState<boolean>(false);

  const onClose = (params?: { state: { deletedFavId: string } }) => {
    setCatData(null);
    toggleModal(false);
    navigate(
      // eslint-disable-next-line no-nested-ternary
      comesFromFavs ? 'favourites' : comesFromImgs ? 'images' : 'breeds',
      params
    );
  };

  const handleErrorResponse = (err: Error | AxiosError) => {
    if (err.status !== 200) {
      toggleModal(false);
      navigate('not_found');
    } else {
      toast.error('Ooops! Something went wrong!');
      console.error(err);
    }
  };

  const getCatDetails = async () => {
    toggleFetching(true);
    const comesFromFavourites = location.pathname.includes('favourites');
    toggleFavs(comesFromFavourites);

    const comesFromImages = location.pathname.includes('images');
    toggleImgs(comesFromImages);

    const comesFromBreeds = location.pathname.includes('breeds');
    toggleBreeds(comesFromBreeds);

    let data = null;
    if (id) {
      if (comesFromImages)
        data = await fetchCatDetails(id as string).catch(handleErrorResponse);

      if (comesFromFavourites)
        data = await fetchFavouriteCat(id as string)
          .then((dt) => dt.image)
          .catch(handleErrorResponse);

      if (comesFromBreeds) {
        const response = await fetchBreedInfo(id as string).catch(
          handleErrorResponse
        );
        data = response?.reduce(
          (acc, cur) => [...acc, { id: cur.id, url: cur.url }],
          []
        );
      }
    }
    setCatData(data);

    toggleFetching(false);
  };

  const openModalForCat = async (imgID: string) => {
    navigate(`/images/${imgID}`);
  };

  useEffect(() => {
    if (isModalOpen && id && id !== 'undefined' && !isFetching) getCatDetails();
  }, [id, isModalOpen]);

  useEffect(() => {
    if (!id || location.pathname.includes('not_found')) toggleModal(false);
  }, [location.pathname]);

  const breedsInfoExist = !!(catData && catData.breeds?.length > 0);

  return (
    <Dialog open={isModalOpen} scroll="body">
      <DialogTitle>
        <SharedDialogHeader
          breedsInfoExist={breedsInfoExist}
          title={breedsInfoExist ? catData?.breeds[0]?.name : ''}
          onClose={onClose}
        />
      </DialogTitle>
      <DialogContent dividers={!!breedsInfoExist} style={{ maxHeight: '80vh' }}>
        {isFetching ? (
          <Box
            style={{
              width: '300px',
              height: '250px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress color="inherit" />
          </Box>
        ) : (
          <>
            {comesFromBrds ? (
              <ImageList rowHeight={200} cols={5}>
                {catData?.map((cat: { id: string; url: string }, i: number) => (
                  <ImageGalleryItem
                    key={generateUniqueKey(i.toString())}
                    data={cat}
                    handleClick={openModalForCat}
                  />
                ))}
              </ImageList>
            ) : (
              <>
                {breedsInfoExist && (
                  <BreedDetails
                    url={catData?.url}
                    breed={catData?.breeds[0]}
                    padding={0}
                  />
                )}
                {!breedsInfoExist && (
                  <LazyLoadImage
                    alt={catData?.url}
                    src={catData?.url}
                    effect="blur"
                    style={{ width: '100%' }}
                  />
                )}
              </>
            )}
            {Object.keys(catData || {}).length === 0 && <NoRecords />}
          </>
        )}
      </DialogContent>
      <DialogActions>
        {Object.keys(catData || {}).length > 0 && (
          <SharedDialogFooter
            imageID={id!}
            wikiUrl={breedsInfoExist ? catData.breeds[0].wikipedia_url : ''}
            breedsInfoExist={breedsInfoExist}
            comesFromImgs={comesFromImgs}
            comesFromFavs={comesFromFavs}
            onClose={onClose}
          />
        )}
      </DialogActions>
    </Dialog>
  );
};

export default SharedModal;

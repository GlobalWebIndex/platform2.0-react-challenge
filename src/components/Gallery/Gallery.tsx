import React, { BaseSyntheticEvent, useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ImageList from '@material-ui/core/ImageList';
import RefreshIcon from '@material-ui/icons/Refresh';

import { fetchCatImages } from '../../api';
import { FetchCatImagesParams, ImageGalleryResponse } from '../../types';
import GalleryFilters from './GalleryFilters';
import {
  Dropdown,
  ImageGalleryItem,
  NoRecords,
  PageHeading,
  BackdropLoader,
} from '../shared';
import { AppContext } from '../AppContext';

import { generateUniqueKey } from '../../helpers';

const Gallery: React.FC = () => {
  const navigate = useNavigate();
  const { id: urlID } = useParams();

  const [catData, setCatData] = useState<ImageGalleryResponse>([]);
  const [isFetching, toggleFetching] = useState<boolean>(false);

  const [limit, setLimit] = useState<string>('10');
  const [order, setOrder] = useState<FetchCatImagesParams['order']>('RANDOM');
  const [type, setType] = useState<'jpg' | 'gif' | undefined>(undefined);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [breed, setBreed] = useState<string | undefined>(undefined);

  const appContext = useContext(AppContext);
  const { toggleModal } = appContext;

  const numberOfImagesOptions = [
    { label: '10', value: '10' },
    { label: '25', value: '25' },
    { label: '50', value: '50' },
  ];

  const galleryContainerStyling = {
    maxHeight: '800px',
    overflowY: 'scroll',
    overflowX: 'hidden',
    margin: '20px 0',
  };

  const initialRequest = async () => {
    toggleFetching(true);
    const defaultParams = {
      limit,
      size: 'small',
      order,
      type,
      category,
      breed,
    } as FetchCatImagesParams;
    const data = await fetchCatImages(defaultParams);
    toggleFetching(false);
    setCatData(data);
  };

  useEffect(() => {
    initialRequest();
  }, [order, type, category, breed, limit]);

  useEffect(() => {
    if (urlID) toggleModal(true);
  }, [urlID]);

  return (
    <Box p={5}>
      <PageHeading title="Image Gallery" />
      <Box mt={3} mb={3}>
        <GalleryFilters
          order={order}
          breed={breed}
          category={category}
          type={type}
          setOrder={setOrder}
          setBreed={setBreed}
          setCategory={setCategory}
          setType={setType}
        />
      </Box>
      <Box style={galleryContainerStyling}>
        {catData.length > 0 ? (
          <ImageList rowHeight={200} cols={5}>
            {catData.map(({ id, url, breeds }) => (
              <ImageGalleryItem
                key={generateUniqueKey(id)}
                data={{ id, url, breeds }}
                handleClick={(imgID) => {
                  toggleModal(true);
                  navigate(`/images/${imgID}`);
                }}
              />
            ))}
          </ImageList>
        ) : (
          <NoRecords />
        )}
      </Box>
      <Dropdown
        filterLabel="Number of images"
        options={numberOfImagesOptions}
        handleChange={(event: BaseSyntheticEvent) => setLimit(event.target.value)}
        active={limit}
      />
      <Box mt={3} mb={3}>
        <Button
          onClick={initialRequest}
          variant="contained"
          disabled={isFetching}
          color="secondary"
          size="large"
          endIcon={<RefreshIcon />}
          fullWidth
        >
          Load more
        </Button>
      </Box>

      <BackdropLoader isFetching={isFetching} />
    </Box>
  );
};

export default Gallery;

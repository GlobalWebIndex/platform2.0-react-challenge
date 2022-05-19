import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ImageListItem from '@material-ui/core/ImageListItem';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ImageListProps } from '../../types';
import { generateUniqueKey } from '../../helpers';

const ImageGalleryItem: React.FC<ImageListProps> = ({
  data: { id, url },
  handleClick,
}) => (
  <ImageListItem key={generateUniqueKey(id)} cols={1} rows={1}>
    <Box mt={2} mb={2}>
      <Button
        style={{ margin: '0 auto', display: 'block' }}
        onClick={() => handleClick(id)}
      >
        <LazyLoadImage
          alt={url}
          src={url}
          effect="blur"
          height={200}
          threshold={200}
        />
      </Button>
    </Box>
  </ImageListItem>
);

export default ImageGalleryItem;

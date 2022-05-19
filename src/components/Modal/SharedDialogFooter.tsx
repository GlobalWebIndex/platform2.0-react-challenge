import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import { toast } from 'react-toastify';

import { removeImageFromFavourites, saveImageAsFavourite } from '../../api';
import { SharedDialogFooterProps } from '../../types';

const SharedDialogFooter: React.FC<SharedDialogFooterProps> = ({
  imageID,
  breedsInfoExist,
  comesFromImgs,
  wikiUrl,
  comesFromFavs,
  onClose,
}) => {
  const markAsFavourite = async () => {
    saveImageAsFavourite(imageID as string).then(
      ({ message }: { message: string }) => {
        if (message === 'SUCCESS') {
          toast.success('Saved as favourite!');
          onClose();
        } else toast.error(message);
      }
    );
  };

  const removeImage = () => {
    removeImageFromFavourites(imageID).then(() => {
      toast.success('Image removed!');
      onClose({ state: { deletedFavId: imageID } });
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: breedsInfoExist ? 'space-between' : 'center',
        width: '100%',
      }}
    >
      {breedsInfoExist && comesFromImgs && (
        <Button
          onClick={() => {
            window.open(wikiUrl, '_blank');
          }}
          endIcon={<NavigateNextIcon />}
          variant="outlined"
          color="secondary"
        >
          Go to Wikipedia
        </Button>
      )}
      {comesFromImgs && (
        <Button
          onClick={markAsFavourite}
          startIcon={<FavoriteIcon />}
          variant="contained"
          color="secondary"
        >
          Save it
        </Button>
      )}
      {comesFromFavs && (
        <Button
          onClick={removeImage}
          startIcon={<DeleteOutlineIcon />}
          variant="contained"
          color="secondary"
          fullWidth
        >
          Remove from Favourites
        </Button>
      )}
    </Box>
  );
};

export default SharedDialogFooter;

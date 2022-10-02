import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton"
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Snackbar from '@mui/material/Snackbar';
import Typography from "@mui/material/Typography"
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAppSelector, useAppDispatch } from '../../redux/app/hooks';
import { addFavouriteAsync, getFavouritesAsync, removeFavouriteAsync, selectFavourites } from "../../redux/slices/photosSlice"
import { IFavouritePhoto } from '../../services/image.storage'
import { CustonBackdropComponent } from "../../common/custom-backdrop.component";

export function FavouritesPageComponent() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [lastUnfavoritedId, setLastUnfavoritedId] = React.useState<string | undefined>();

    const favourites = useAppSelector(selectFavourites);

    const dispatch = useAppDispatch();

    useEffect(() => {
        loadFavourites()
    }, []);

    const loadFavourites = async () => {
        setIsLoading(true);
        await dispatch(getFavouritesAsync());
        setIsLoading(false)
    }

    const unfavouriteSelectetdImage = async (item: IFavouritePhoto) => {
        setIsLoading(true);
        await dispatch(removeFavouriteAsync(item.id));
        await setLastUnfavoritedId(item.image_id)
        setIsLoading(false)
    }

    // Favourite the last image removed from favourites after UNDO
    const favouriteLastImage = async () => {
        if (lastUnfavoritedId) {
            setIsLoading(true);
            await dispatch(addFavouriteAsync(lastUnfavoritedId));
            handleCloseSnackBar()
            setIsLoading(false)
        }
    }

    const handleCloseSnackBar = () => {
        setLastUnfavoritedId(undefined)
    }

    // Renders UNDO button for snackbar
    const renderUndoAction = () => {
        return <React.Fragment>
            <Button color="secondary" size="small" onClick={() => favouriteLastImage()} >
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseSnackBar}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    }

    return (
        <>
            <CustonBackdropComponent isLoading={isLoading} />
            <Snackbar
                open={!!lastUnfavoritedId}
                autoHideDuration={6000}
                onClose={handleCloseSnackBar}
                message="Image removed from favourites"
                action={renderUndoAction()}
            />
            {favourites.length > 0 ? <ImageList
                style={{ overflow: "hidden", marginTop: 100, width: 700 }}
                cols={5}
                rowHeight={200}
                gap={20}
            >
                {favourites.map((item) => {

                    return (
                        <ImageListItem key={item.id} cols={1} rows={1} >
                            <img
                                style={{ borderRadius: 10, boxShadow: "0 2px 20px -10px gray" }}
                                src={item.image.url}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                sx={{
                                    background:
                                        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                    borderRadius: "10px"
                                }}
                                position="top"
                                actionIcon={
                                    <IconButton
                                        sx={{ color: '#ed4957' }}
                                        onClick={() => unfavouriteSelectetdImage(item)}
                                    >
                                        <FavoriteIcon />
                                    </IconButton>
                                }
                                actionPosition="left"
                            />
                        </ImageListItem>
                    );
                })}
            </ImageList> : <Typography >Looks like you have not favourited any cat photos yet...🤔</Typography>}
        </>
    );

}

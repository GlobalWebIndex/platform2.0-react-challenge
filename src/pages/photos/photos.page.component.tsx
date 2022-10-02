import React, { useEffect } from 'react';
import { Link } from "react-router-dom"
import { useParams } from 'react-router';
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton"
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Snackbar from '@mui/material/Snackbar';
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppSelector, useAppDispatch } from '../../redux/app/hooks';
import { getPhotosAsync, selectPhotos, selectAllPhotosRetrieved } from "../../redux/slices/photosSlice"
import { ICatPhoto } from '../../services/image.storage'
import { CustonBackdropComponent } from '../../common/custom-backdrop.component';
import NavbarComponent from '../../common/navbar.component'

export function PhotosPageComponent() {
    const [breedId, setBreedId] = React.useState<string | undefined>();
    const [isLoading, setIsLoading] = React.useState(false);
    const [snackBarOpen, setSnackBarOpen] = React.useState(false);

    const { id } = useParams()

    const photos = useAppSelector(selectPhotos)
    const allPhotosRetrieved = useAppSelector(selectAllPhotosRetrieved)
    const dispatch = useAppDispatch();

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackBarOpen(false);
    };

    const loadPhotos = async () => {
        setIsLoading(true);
        await dispatch(getPhotosAsync(id));
        setBreedId(id);
        setIsLoading(false)
    }

    useEffect(() => {
        console.log(id, breedId)
        if (photos.length == 0) {
            loadPhotos();
        } else if (id != breedId) {
            loadPhotos()
        }
    }, [id]);

    const renderCloseAction = () => {
        return <React.Fragment>

            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    }

    return (
        <>
            <NavbarComponent />
            <Snackbar
                open={snackBarOpen}
                autoHideDuration={6000}
                onClose={handleClose}
                message="No more images..."
                action={renderCloseAction()}

            />
            <CustonBackdropComponent isLoading={isLoading} />
            {photos &&
                <ImageList
                    key={photos.length}
                    variant="quilted"
                    cols={5}
                    rowHeight={200}
                    style={{ overflow: "hidden", marginTop: 100, width: 700 }}
                    gap={20}
                >

                    {photos.map((item: ICatPhoto) => (
                        <Link key={item.id} to={"/photos/details/" + item.id}> <ImageListItem key={item.url} cols={item.cols || 1} rows={item.rows || 1}>

                            <img
                                style={{ cursor: "pointer", borderRadius: 10, boxShadow: "0 2px 20px -10px gray" }}
                                src={item.url}
                                alt={item.url}
                                loading="lazy"
                            />

                        </ImageListItem></Link>
                    ))}
                </ImageList>
            }
            <Tooltip title={allPhotosRetrieved ? "No more photos available" : ""} placement="top">
                <div style={{ position: "fixed", bottom: 20, right: 20 }}>
                    <Button data-testid="load-more-button-id" style={{ color: allPhotosRetrieved ? "grey" : "#1bb76e" }} variant={allPhotosRetrieved ? "text" : "outlined"} disabled={allPhotosRetrieved} endIcon={<ExpandMoreIcon />} onClick={() => loadPhotos()} >Load more images </Button>
                </div>
            </Tooltip>
        </>
    )
}
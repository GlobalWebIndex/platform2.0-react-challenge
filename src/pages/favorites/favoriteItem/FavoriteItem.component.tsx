import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Favorite } from '../../../utils/models';
import { CircularProgress } from '@mui/material';
import { StyledImageGridItem } from '../../../components/commonStyledComponents/CommonStyledComponents.styled';
import { SetStateAction, useState } from 'react';
import { GRID_ITEM_LARGE_SIZE } from '../../../utils/contants';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import { TestIds } from '../../../utils/testids';

interface FavoriteProps {
    favorite: Favorite;
    setIsDialogOpen: React.Dispatch<SetStateAction<boolean>>;
    setDeleteId: React.Dispatch<SetStateAction<number | null>>;
    isLoading: boolean;
    deleteId: number | null;
}

const FavoriteItem: React.FC<FavoriteProps> = ({ favorite, setIsDialogOpen, setDeleteId, deleteId, isLoading }) => {
    const { id, created_at, image } = favorite;

    const [showBar, setShowBar] = useState<boolean>(false);
    const zoom = [1, 1.1, 1.2];
    const [zoomIndex, setZoomIndex] = useState(zoom[0]);

    const handleDeleteItem = (id: number) => {
        setIsDialogOpen(true);
        setDeleteId(id);
    };

    const handleZoomInClick = () => {
        setZoomIndex((prevValue) => (prevValue < zoom.length ? prevValue + 1 : prevValue));
    };

    const handleZoomOutClick = () => {
        setZoomIndex((prevValue) => (prevValue > zoom[0] ? prevValue - 1 : prevValue));
    };

    if (isLoading && deleteId === id) {
        return (
            <StyledImageGridItem
                width={GRID_ITEM_LARGE_SIZE}
                height={GRID_ITEM_LARGE_SIZE}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <CircularProgress size={'5em'} />
            </StyledImageGridItem>
        );
    }

    return (
        <StyledImageGridItem
            onMouseOver={() => setShowBar(true)}
            onMouseOut={() => setShowBar(false)}
            width={GRID_ITEM_LARGE_SIZE}
            height={GRID_ITEM_LARGE_SIZE}
        >
            <ImageListItem style={{ height: '100%', overflow: 'hidden', width: '100%' }} data-testid={TestIds.favoriteItem}>
                <img src={image.url} style={{ transform: `scale(${zoomIndex})` }} />
                {showBar ? (
                    <ImageListItemBar
                        title={`Added at: ${created_at.split('T')[0]}`}
                        actionIcon={
                            <>
                                <IconButton onClick={handleZoomOutClick} disabled={zoomIndex === 1} sx={{ color: 'common.white' }}>
                                    <ZoomOutIcon color="inherit" />
                                </IconButton>
                                <IconButton onClick={handleZoomInClick} disabled={zoomIndex === 3} sx={{ color: 'common.white' }}>
                                    <ZoomInIcon color="inherit" />
                                </IconButton>
                                <IconButton disabled={isLoading} onClick={() => handleDeleteItem(id)} sx={{ color: 'common.white' }}>
                                    <DeleteOutlineIcon color="inherit" />
                                </IconButton>
                            </>
                        }
                    ></ImageListItemBar>
                ) : null}
            </ImageListItem>
        </StyledImageGridItem>
    );
};

export default FavoriteItem;

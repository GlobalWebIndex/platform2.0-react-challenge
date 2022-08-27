import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Favorite } from '../../../utils/models';
import { CircularProgress } from '@mui/material';
import { StyledGridItem } from '../../../components/commonStyled/Common.styled';
import { SetStateAction, useState } from 'react';
import { GRID_ITEM_LARGE_SIZE } from '../../../utils/contants';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

interface FavoriteProps {
    favorite: Favorite;
    setIsDialogOpen: React.Dispatch<SetStateAction<boolean>>;
    setDeleteId: React.Dispatch<SetStateAction<number | null>>;
    isLoading: boolean;
}

const FavoriteItem: React.FC<FavoriteProps> = ({
    favorite,
    setIsDialogOpen,
    isLoading,
    setDeleteId,
}) => {
    const { id, created_at, image } = favorite;
    const [showBar, setShowBar] = useState<boolean>(false);
    const scale = [1, 1.1, 1.2];
    const [scaleIndex, setScaleIndex] = useState(scale[0]);

    const handleDeleteItem = (id: number) => {
        setIsDialogOpen(true);
        setDeleteId(id);
    };

    const handleZoomInClick = () => {
        setScaleIndex((prevValue) =>
            prevValue < scale.length ? prevValue + 1 : prevValue
        );
    };

    const handleZoomOutClick = () => {
        setScaleIndex((prevValue) =>
            prevValue > scale[0] ? prevValue - 1 : prevValue
        );
    };

    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        <StyledGridItem
            onMouseOver={() => setShowBar(true)}
            onMouseOut={() => setShowBar(false)}
            width={GRID_ITEM_LARGE_SIZE}
            height={GRID_ITEM_LARGE_SIZE}
        >
            <ImageListItem
                style={{ height: '100%', overflow: 'hidden', width: '100%' }}
            >
                <img
                    src={image.url}
                    style={{ transform: `scale(${scaleIndex})` }}
                />
                {showBar ? (
                    <ImageListItemBar
                        title={`Added at: ${created_at.split('T')[0]}`}
                        actionIcon={
                            <>
                                <IconButton
                                    onClick={handleZoomOutClick}
                                    disabled={scaleIndex === 1}
                                >
                                    <ZoomOutIcon />
                                </IconButton>
                                <IconButton
                                    onClick={handleZoomInClick}
                                    disabled={scaleIndex === 3}
                                >
                                    <ZoomInIcon />
                                </IconButton>
                                <IconButton
                                    onClick={() => handleDeleteItem(id)}
                                >
                                    <DeleteOutlineIcon />
                                </IconButton>
                            </>
                        }
                    ></ImageListItemBar>
                ) : null}
            </ImageListItem>
        </StyledGridItem>
    );
};

export default FavoriteItem;

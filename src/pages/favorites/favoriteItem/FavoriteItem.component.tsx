import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { DeleteResponse, Favorite } from '../../../utils/models';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useAppDispatch } from '../../../context/appContext';
import { deleteFavorite } from '../../../api/favorites';
import { CircularProgress } from '@mui/material';
import { StyledGridItem } from '../../../components/commonStyled/Common.styled';
import { useState } from 'react';
import { GRID_ITEM_LARGE_SIZE } from '../../../utils/contants';

interface FavoriteProps {
    favorite: Favorite;
}

const FavoriteItem: React.FC<FavoriteProps> = ({ favorite }) => {
    const { id, created_at, image } = favorite;
    const appDispatch = useAppDispatch();
    const queryClient = useQueryClient();
    const [showBar, setShowBar] = useState<boolean>(false);

    const { mutate, isLoading: isLoading } = useMutation<DeleteResponse, AxiosError, number, (id: number) => void>(
        deleteFavorite,
        {
            onSuccess: (res, id) => {
                if (res.message === 'SUCCESS') {
                    queryClient.invalidateQueries(['favorites']);
                    appDispatch({ type: 'REMOVE_FROM_FAVORITES', favoriteId: id });
                }
            },
        },
    );

    const handleDeleteItem = (id: number) => mutate(id);

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
            <ImageListItem style={{ height: '100%' }}>
                <img src={image.url} />
                {showBar ? (
                    <ImageListItemBar
                        title={`added at: ${created_at.split('T')[0]}`}
                        actionIcon={
                            <IconButton onClick={() => handleDeleteItem(id)}>
                                <DeleteOutlineIcon />
                            </IconButton>
                        }
                    ></ImageListItemBar>
                ) : null}
            </ImageListItem>
        </StyledGridItem>
    );
};

export default FavoriteItem;

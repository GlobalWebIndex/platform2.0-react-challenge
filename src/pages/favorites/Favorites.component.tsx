import { useAppDispatch, useAppState } from '../../context/appContext';
import FavoriteItem from './favoriteItem/FavoriteItem.component';
import { Typography } from '@mui/material';
import {
    StyledContainer,
    StyledGrid,
} from '../../components/commonStyled/Common.styled';
import {
    GRID_COLUMN_WIDTH_LARGE,
    GRID_ITEM_LARGE_SIZE,
} from '../../utils/contants';
import Skeleton from '../../components/skeleton/Skeleton.component';
import { ConfirmationDialog } from '../../components/dialog/ConfirmationDialog.component';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { DeleteResponse } from '../../utils/models';
import { deleteFavorite } from '../../api/favorites';

const Favorites: React.FC = () => {
    const { favorites } = useAppState();
    const queryClient = useQueryClient();
    const appDispatch = useAppDispatch();
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const { mutate, isLoading } = useMutation<
        DeleteResponse,
        AxiosError,
        number,
        (id: number) => void
    >(deleteFavorite, {
        onSuccess: (res, id) => {
            if (res.message === 'SUCCESS') {
                queryClient.invalidateQueries(['favorites']);
                appDispatch({ type: 'REMOVE_FROM_FAVORITES', favoriteId: id });
            }
        },
    });

    const handleDelete = () => {
        deleteId ? mutate(deleteId) : null;
    };

    if (!favorites) {
        return <Skeleton gridItemSize={GRID_ITEM_LARGE_SIZE} />;
    }

    return (
        <StyledContainer>
            {favorites.length > 0 ? (
                <StyledGrid columnWidth={GRID_COLUMN_WIDTH_LARGE}>
                    {favorites.map((favorite) => {
                        return (
                            <FavoriteItem
                                key={favorite.id}
                                favorite={favorite}
                                setDeleteId={setDeleteId}
                                setIsDialogOpen={setIsDialogOpen}
                                isLoading={isLoading}
                            />
                        );
                    })}
                </StyledGrid>
            ) : (
                <Typography
                    variant="h6"
                    sx={{ textAlign: 'center', mt: 12 }}
                >
                    Looks like you do not have any favorites yet..
                </Typography>
            )}
            <ConfirmationDialog
                dialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                onConfirm={handleDelete}
            />
        </StyledContainer>
    );
};

export default Favorites;

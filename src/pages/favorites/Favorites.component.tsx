import { useAppDispatch, useAppState } from '../../context/appContext';
import FavoriteItem from './favoriteItem/FavoriteItem.component';
import { Typography } from '@mui/material';
import { StyledContainer, StyledImageGrid } from '../../components/commonStyledComponents/CommonStyledComponents.styled';
import { DEFAULT_QUERY_OPTIONS, GRID_COLUMN_WIDTH_LARGE, GRID_ITEM_LARGE_SIZE } from '../../utils/contants';
import Skeleton from '../../components/skeleton/Skeleton.component';
import { ConfirmationDialog } from '../../components/dialog/ConfirmationDialog.component';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { DeleteResponse } from '../../utils/models';
import { deleteFavorite, getFavorites } from '../../api/favorites';
import { QueryKeys } from '../../utils/enums';
import Error from '../../components/errorUI/Error.component';

const Favorites: React.FC = () => {
    const queryClient = useQueryClient();
    const appDispatch = useAppDispatch();
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const {
        data: favorites,
        isLoading: isGetFavoritesLoading,
        isError: isGetFavoritesError,
    } = useQuery([QueryKeys.Favorites], getFavorites, {
        ...DEFAULT_QUERY_OPTIONS,
        onSuccess: (data) => {
            appDispatch({
                type: 'SET_FAVORITE_LIST',
                favorites: data
                    ? data.map((item) => ({
                          id: item.id,
                          imageId: item.image_id,
                      }))
                    : [],
            });
        },
    });

    const { mutate: mutateFavorite, isLoading: isDeleteLoading } = useMutation<DeleteResponse, AxiosError, number, (id: number) => void>(deleteFavorite, {
        onSuccess: (res, id) => {
            if (res.message === 'SUCCESS') {
                queryClient.invalidateQueries(['favorites']);
                appDispatch({
                    type: 'REMOVE_FROM_FAVORITES',
                    favoriteId: id,
                });
            }
        },
    });

    const handleDelete = () => {
        deleteId ? mutateFavorite(deleteId) : null;
    };

    return (
        <StyledContainer>
            {isGetFavoritesLoading && <Skeleton gridItemSize={GRID_ITEM_LARGE_SIZE} />}
            {isGetFavoritesError && <Error />}
            {favorites && favorites.length > 0 ? (
                <StyledImageGrid columnWidth={GRID_COLUMN_WIDTH_LARGE}>
                    {favorites.map((favorite) => {
                        return (
                            <FavoriteItem
                                key={favorite.id}
                                favorite={favorite}
                                deleteId={deleteId}
                                setDeleteId={setDeleteId}
                                setIsDialogOpen={setIsDialogOpen}
                                isLoading={isDeleteLoading}
                            />
                        );
                    })}
                </StyledImageGrid>
            ) : (
                <Typography variant="h6" sx={{ textAlign: 'center', mt: 12 }}>
                    Looks like you do not have any favorites.
                </Typography>
            )}
            {deleteId ? (
                <ConfirmationDialog
                    dialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                    onConfirm={handleDelete}
                    isConfirmationActionLoading={isDeleteLoading}
                />
            ) : null}
        </StyledContainer>
    );
};

export default Favorites;

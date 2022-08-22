import { useState } from 'react';
import { deleteFavorite, getFavorites } from '../../api/favorites';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { DeleteResponse } from '../../utils/models';
import { QueryKeys } from '../../utils/enums';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppDispatch, useAppState } from '../../context/appContext';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import FavoriteItem from './favorite/Favorite.component';

const Favorites: React.FC = () => {
    const { favorites } = useAppState();

    console.log(favorites);

    //maybe content / condition (current view etc)

    if (!favorites) {
        return <h1>'skeleton maybe..?'</h1>;
    }

    return (
        <>
            {favorites.length > 0 ? (
                <ImageList>
                    <ImageListItem>
                        <ListSubheader>Favorites</ListSubheader>
                    </ImageListItem>
                    {favorites.map((favorite) => {
                        return <FavoriteItem key={favorite.id} favorite={favorite} />;
                    })}
                </ImageList>
            ) : (
                <h3>Looks like you do not have any favorites yet</h3>
            )}
        </>
    );
};

export default Favorites;

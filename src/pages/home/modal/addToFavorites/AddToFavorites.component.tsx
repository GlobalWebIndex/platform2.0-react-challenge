import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { IconWithLabel } from '../../../../utils/models';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { catExistsInFavorites } from '../../../../utils/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postFavorites } from '../../../../api/favorites';
import { AxiosError } from 'axios';
import { useAppState, useAppDispatch } from '../../../../context/appContext';

interface AddToFavoritesProps {}

const AddToFavorites: React.FC<AddToFavoritesProps> = ({}) => {
    const { selectedCat, favorites } = useAppState();
    const appDispatch = useAppDispatch();
    const queryClient = useQueryClient();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [addToFavoritesButtonContent, setAddToFavoritesButtonContent] =
        useState<IconWithLabel>({
            label: 'add to favorites',
            icon: <FavoriteBorderIcon />,
        });

    useEffect(() => {
        if (selectedCat && catExistsInFavorites(selectedCat, favorites)) {
            setAddToFavoritesButtonContent({
                label: 'Added!',
                icon: <FavoriteIcon />,
            });
            setIsButtonDisabled(true);
        } else {
            setAddToFavoritesButtonContent({
                label: 'Add to favorites',
                icon: <FavoriteBorderIcon />,
            });
        }
    }, [selectedCat]);

    const { mutate, isLoading: isMutationLoading } = useMutation<
        { message: string; id: number },
        AxiosError,
        string,
        () => void
    >(() => postFavorites(selectedCat ? selectedCat.id : ''), {
        onSuccess: (data) => {
            setAddToFavoritesButtonContent({
                label: 'Added!',
                icon: <FavoriteIcon />,
            });
            setIsButtonDisabled(true);
            queryClient.invalidateQueries(['favorites']);
            appDispatch({
                type: 'ADD_TO_FAVORITES',
                favorite: {
                    id: data.id,
                    imageId: selectedCat ? selectedCat?.id : '',
                },
            });
        },
    });

    const handleAddToFavorites = () => {
        if (selectedCat && !catExistsInFavorites(selectedCat, favorites)) {
            setIsButtonDisabled(true);
            mutate(selectedCat ? selectedCat.id : '');
        }
    };

    return (
        <Button
            disabled={isButtonDisabled}
            onClick={handleAddToFavorites}
            endIcon={addToFavoritesButtonContent.icon}
            color="primary"
            variant="outlined"
            sx={{ textTransform: 'none' }}
        >
            {isMutationLoading
                ? 'adding...'
                : addToFavoritesButtonContent.label}
        </Button>
    );
};

export default AddToFavorites;

import { useState, useEffect } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Modal, Typography } from '@mui/material';
import { IconWithLabel } from '../../../utils/models';
//TODO: fix styledbox location, mui etc
import { StyledBox } from '../Home.styled';
import { useAppDispatch, useAppState } from '../../../context/appContext';
import { postFavorites } from '../../../api/favorites';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { catExistsInFavorites, getCatInfo } from '../../../utils/helpers';
import Rating from '@mui/material/Rating';
import CopyToClipboard from './copyToClipboard/CopyToClipboard.component';
import { CHANGING_ICON_DURATION } from '../../../utils/contants';

interface CatModalProps {
    modalOpen: boolean;
}

const CatModal: React.FC<CatModalProps> = ({ modalOpen }) => {
    const queryClient = useQueryClient();
    const appDispatch = useAppDispatch();
    const { selectedCat, favorites } = useAppState();
    const [copyText, setCopyText] = useState<string>('');
    const [addToFavorites, setAddToFavorites] = useState<IconWithLabel>({
        label: 'add to favorites',
        icon: <FavoriteBorderIcon />,
    });

    useEffect(() => {
        if (selectedCat) {
            setCopyText(selectedCat.url);
        }
    }, [selectedCat]);

    useEffect(() => {
        if (selectedCat && catExistsInFavorites(selectedCat, favorites)) {
            setAddToFavorites({
                label: 'Added!',
                icon: <FavoriteIcon />,
            });
        }
    }, [selectedCat]);

    const { mutate, isLoading } = useMutation<Response, AxiosError, string, () => void>(
        () => postFavorites(selectedCat ? selectedCat.id : ''),
        {
            onSuccess: () => {
                setAddToFavorites({
                    label: 'Added!',
                    icon: <FavoriteIcon />,
                });
                queryClient.invalidateQueries(['favorites']);
            },
        },
    );

    const handleAddToFavorites = () => {
        mutate(selectedCat ? selectedCat.id : '');
    };

    const catDescription = selectedCat?.breeds ? getCatInfo(selectedCat.breeds[0]).description : '';

    return (
        <>
            <Modal open={modalOpen} onClose={() => appDispatch({ type: 'TOGGLE_CAT_MODAL', catModal: false })}>
                <StyledBox sx={{ width: 800 }}>
                    <Card>
                        <CardMedia component="img" image={selectedCat?.url} />
                        <CardContent>
                            <Typography>{catDescription}</Typography>
                            {selectedCat?.breeds ? (
                                getCatInfo(selectedCat?.breeds[0]).stats.map((item) => (
                                    <div key={item.name}>
                                        <Typography component="legend">{item.name}</Typography>
                                        <Rating value={item.value} readOnly />
                                    </div>
                                ))
                            ) : (
                                <h3>no info available for this one</h3>
                            )}
                        </CardContent>
                        <CardActions>
                            <Button
                                disabled={isLoading}
                                onClick={handleAddToFavorites}
                                endIcon={addToFavorites.icon}
                                color="primary"
                            >
                                {isLoading ? 'adding...' : addToFavorites.label}
                            </Button>
                            <CopyToClipboard
                                textToCopy={selectedCat ? copyText : ''}
                                duration={CHANGING_ICON_DURATION}
                                mainIcon={<ContentCopyIcon />}
                                secondaryIcon={<CheckCircleIcon />}
                            />
                        </CardActions>
                    </Card>
                </StyledBox>
            </Modal>
        </>
    );
};

export default CatModal;

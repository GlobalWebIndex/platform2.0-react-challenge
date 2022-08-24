import { useState, useEffect } from 'react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Modal, Typography } from '@mui/material';
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
import { sxBox } from './HomeModal.styled';

interface HomeModalProps {
    modalOpen: boolean;
}

const HomeModal: React.FC<HomeModalProps> = ({ modalOpen }) => {
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

    const catName = selectedCat?.breeds ? selectedCat.breeds[0].name : '';
    const catDescription = selectedCat?.breeds ? getCatInfo(selectedCat.breeds[0]).description : '';

    return (
        <>
            <Modal open={modalOpen} onClose={() => appDispatch({ type: 'TOGGLE_CAT_MODAL', catModal: false })}>
                <StyledBox>
                    <Card>
                        <CardMedia component="img" image={selectedCat?.url} height={394} sx={{ objectFit: 'cover' }} />
                        <CardContent sx={{ pb: 0, pt: 0, textAlign: 'center' }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                {catName}
                            </Typography>
                            <Typography sx={{ fontSize: '0.8em' }}>{catDescription}</Typography>
                            <Box sx={sxBox}>
                                {selectedCat?.breeds ? (
                                    getCatInfo(selectedCat?.breeds[0]).stats.map((item) => (
                                        <div key={item.name}>
                                            <Typography component="legend" sx={{ textAlign: 'center' }}>
                                                {item.name}
                                            </Typography>
                                            <Rating value={item.value} readOnly />
                                        </div>
                                    ))
                                ) : (
                                    <h3>no info available for this one</h3>
                                )}
                            </Box>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center' }}>
                            <Button
                                disabled={isLoading}
                                onClick={handleAddToFavorites}
                                endIcon={addToFavorites.icon}
                                color="primary"
                                variant="outlined"
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

export default HomeModal;

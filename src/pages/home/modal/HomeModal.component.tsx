import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Modal,
    Typography,
} from '@mui/material';
import { StyledBox } from '../Home.styled';
import { useAppDispatch, useAppState } from '../../../context/appContext';
import { getCatInfo } from '../../../utils/helpers';
import CopyToClipboard from './copyToClipboard/CopyToClipboard.component';
import AddToFavorites from './addToFavorites/AddToFavorites.component';
import Stats from './info/Stats.component';

interface HomeModalProps {
    modalOpen: boolean;
}

const HomeModal: React.FC<HomeModalProps> = ({ modalOpen }) => {
    const appDispatch = useAppDispatch();
    const { selectedCat } = useAppState();

    const handleCloseModal = () => {
        appDispatch({ type: 'TOGGLE_CAT_MODAL', catModal: false });
    };
    const catName = selectedCat?.breeds ? selectedCat.breeds[0].name : '';
    const catDescription = selectedCat?.breeds
        ? getCatInfo(selectedCat.breeds[0]).description
        : '';

    return (
        <>
            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
            >
                <StyledBox>
                    <Card>
                        <CardMedia
                            component="img"
                            image={selectedCat?.url}
                            height={394}
                            sx={{ objectFit: 'cover' }}
                        />
                        <CardContent sx={{ pb: 0, pt: 0, textAlign: 'center' }}>
                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: 600 }}
                            >
                                {catName}
                            </Typography>
                            <Typography sx={{ fontSize: '0.8em' }}>
                                {catDescription}
                            </Typography>
                            <Stats selectedCat={selectedCat} />
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center' }}>
                            <AddToFavorites />
                            <CopyToClipboard
                                url={selectedCat ? selectedCat.url : ''}
                            />
                        </CardActions>
                    </Card>
                </StyledBox>
            </Modal>
        </>
    );
};

export default HomeModal;

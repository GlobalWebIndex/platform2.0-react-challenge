import { useQuery } from '@tanstack/react-query';
import { Card, CardActions, ImageList, ImageListItem, ListSubheader, Modal, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
//TODO: fix styledbox location, mui etc
import { StyledBox } from '../../home/Home.styled';
import { useAppDispatch } from '../../../context/appContext';
import { getBreed } from '../../../api/breeds';
import { Cat, SubBreed } from '../../../utils/models';
import { QueryKeys } from '../../../utils/enums';
import { useNavigate } from 'react-router';
import Error from '../../../components/errorUI/Error.component';

interface CatModalProps {
    modalOpen: boolean;
    selectedBreed: SubBreed;
    onClose: () => void;
}

const BreedModal: React.FC<CatModalProps> = ({ modalOpen, selectedBreed, onClose }) => {
    const appDispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id, name: breedName } = selectedBreed;
    console.log(selectedBreed);

    const {
        data: cats,
        isError,
        isLoading,
    } = useQuery([QueryKeys.Breeds, id], () => getBreed(id), { enabled: modalOpen });

    if (isError) {
        return <Error />;
    }
    if (isLoading) {
        return <CircularProgress />;
    }

    const handleCatClick = (cat: Cat) => {
        appDispatch({ type: 'SET_SELECTED_CAT', cat });
        appDispatch({ type: 'TOGGLE_CAT_MODAL', catModal: true });
        navigate('/');
    };
    console.log(cats);
    return (
        <Modal open={modalOpen} onClose={onClose}>
            <StyledBox>
                <Card>
                    <ImageList gap={16} sx={{ maxHeight: 600, p: 1 }}>
                        <ImageListItem key="Subheader" cols={2}>
                            <ListSubheader component="div" sx={{ backgroundColor: 'transparent', textAlign: 'center' }}>
                                <Typography variant="h5" color="common.white">
                                    {breedName}
                                </Typography>
                                <Typography variant="subtitle2" color="common.white">
                                    Click any to get more info about this breed!
                                </Typography>
                            </ListSubheader>
                        </ImageListItem>
                        {cats.map((cat) => (
                            <ImageListItem key={cat.id} onClick={() => handleCatClick(cat)}>
                                <img src={cat.url} loading="lazy" />
                            </ImageListItem>
                        ))}
                    </ImageList>
                    <CardActions></CardActions>
                </Card>
            </StyledBox>
        </Modal>
    );
};

export default BreedModal;

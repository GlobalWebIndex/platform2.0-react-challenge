import { useQuery } from '@tanstack/react-query';
import { Card, CardActions, ImageList, ImageListItem, ListSubheader, Modal } from '@mui/material';
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

    return (
        <Modal open={modalOpen} onClose={onClose}>
            <StyledBox sx={{ width: 200 }}>
                <Card>
                    <ImageList sx={{ width: 500, height: 450 }}>
                        <ImageListItem key="Subheader" cols={2}>
                            <ListSubheader component="div">{breedName}</ListSubheader>
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

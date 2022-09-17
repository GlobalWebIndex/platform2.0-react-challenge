import { useQuery } from '@tanstack/react-query';
import { Card, ImageList, ImageListItem, ListSubheader, Modal, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { StyledBox } from '../../home/Home.styled';
import { useAppDispatch } from '../../../context/appContext';
import { getBreed } from '../../../api/breeds';
import { Cat, SubBreed } from '../../../utils/models';
import { QueryKeys } from '../../../utils/enums';
import Error from '../../../components/errorUI/Error.component';
import { sxCircularProgress, sxListSubheader } from './BreedModal.styled';
import { DEFAULT_QUERY_OPTIONS } from '../../../utils/contants';
import { TestIds } from '../../../utils/testids';

interface CatModalProps {
    modalOpen: boolean;
    selectedBreed: SubBreed;
    onClose: () => void;
}

const BreedModal: React.FC<CatModalProps> = ({ modalOpen, selectedBreed, onClose }) => {
    const appDispatch = useAppDispatch();
    const { id, name: breedName } = selectedBreed;

    const {
        data: cats,
        isError,
        isLoading,
    } = useQuery([QueryKeys.Breeds, id], () => getBreed(id), {
        ...DEFAULT_QUERY_OPTIONS,
        enabled: modalOpen,
    });

    const handleCatClick = (cat: Cat) => {
        appDispatch({ type: 'SET_SELECTED_CAT', cat });
        appDispatch({ type: 'TOGGLE_CAT_MODAL', catModal: true });
        onClose();
    };

    return (
        <Modal open={modalOpen} onClose={onClose}>
            <>
                {isLoading && <CircularProgress size={'8em'} sx={sxCircularProgress} data-testid={TestIds.circularProgress} />}
                <StyledBox>
                    {isError && <Error />}
                    <Card>
                        <ImageList gap={16} sx={{ maxHeight: 600, p: 1 }}>
                            <ImageListItem key="Subheader" cols={2}>
                                <ListSubheader component="div" sx={sxListSubheader}>
                                    <Typography variant="h5">{breedName}</Typography>
                                    <Typography variant="subtitle2">Click any to get more info about this breed!</Typography>
                                </ListSubheader>
                            </ImageListItem>
                            {cats
                                ? cats.map((cat) => (
                                      <ImageListItem key={cat.id} onClick={() => handleCatClick(cat)} data-testid={cat.id}>
                                          <img src={cat.url} loading="lazy" />
                                      </ImageListItem>
                                  ))
                                : null}
                        </ImageList>
                    </Card>
                </StyledBox>
            </>
        </Modal>
    );
};

export default BreedModal;

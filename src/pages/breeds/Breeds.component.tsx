import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBreeds } from '../../api/breeds';
import { useAppDispatch, useAppState } from '../../context/appContext';
import { Breed, SubBreed } from '../../utils/models';
import BreedModal from './modal/BreedModal.component';
import { QueryKeys } from '../../utils/enums';
import Error from '../../components/errorUI/Error.component';
import { DEFAULT_QUERY_OPTIONS, GRID_COLUMN_WIDTH_SMALL, GRID_ITEM_SMALL_SIZE } from '../../utils/contants';
import { StyledContainer, StyledImageGrid, StyledImageGridItem } from '../../components/commonStyledComponents/CommonStyledComponents.styled';
import Skeleton from '../../components/skeleton/Skeleton.component';
import { Box } from '@mui/material';
import HomeModal from '../home/modal/HomeModal.component';

const Breeds: React.FC = () => {
    const appDispatch = useAppDispatch();
    const { selectedCat, isHomeModalOpen } = useAppState();
    const [isBreedModalOpen, setIsBreedModalOpen] = useState<boolean>(false);
    const [selectedBreed, setSelectedBreed] = useState<SubBreed>({
        name: '',
        id: '',
    });

    const {
        isError,
        isLoading,
        data: breeds,
    } = useQuery([QueryKeys.Breeds], getBreeds, {
        ...DEFAULT_QUERY_OPTIONS,
        onSuccess: (data: Breed[]) => {
            appDispatch({ type: 'SET_BREED_LIST', breeds: data });
        },
    });

    const handleItemClick = (breed: Breed) => {
        setIsBreedModalOpen(true);
        setSelectedBreed({ name: breed.name, id: breed.id });
    };

    const closeBreedModal = () => setIsBreedModalOpen(false);

    if (isError) {
        return <Error />;
    }
    if (isLoading) {
        return <Skeleton title={true} />;
    }

    return (
        <StyledContainer>
            <StyledImageGrid columnWidth={GRID_COLUMN_WIDTH_SMALL}>
                {breeds.map((breed: Breed) => {
                    return (
                        <Box key={breed.id}>
                            <h5 style={{ textAlign: 'center' }}>{breed.name}</h5>
                            <StyledImageGridItem onClick={() => handleItemClick(breed)} width={GRID_ITEM_SMALL_SIZE} height={GRID_ITEM_SMALL_SIZE}>
                                <img src={breed?.image?.url} />
                            </StyledImageGridItem>
                        </Box>
                    );
                })}
            </StyledImageGrid>
            {selectedBreed.id ? <BreedModal modalOpen={isBreedModalOpen} selectedBreed={selectedBreed} onClose={closeBreedModal} /> : null}
            {selectedCat && <HomeModal modalOpen={isHomeModalOpen} />}
        </StyledContainer>
    );
};

export default Breeds;

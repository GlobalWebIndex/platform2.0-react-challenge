import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBreeds } from '../../api/breeds';
import { useAppDispatch } from '../../context/appContext';
import { Breed, SubBreed } from '../../utils/models';
import BreedModal from './modal/BreedModal.component';
import { QueryKeys } from '../../utils/enums';
import Error from '../../components/errorUI/Error.component';
import {
    DEFAULT_QUERY_OPTIONS,
    GRID_COLUMN_WIDTH_SMALL,
    GRID_ITEM_SMALL_SIZE,
} from '../../utils/contants';
import {
    StyledContainer,
    StyledGrid,
    StyledGridItem,
} from '../../components/commonStyled/Common.styled';
import Skeleton from '../../components/skeleton/Skeleton.component';
import { Box } from '@mui/material';

const Breeds: React.FC = () => {
    const appDispatch = useAppDispatch();
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
            <StyledGrid columnWidth={GRID_COLUMN_WIDTH_SMALL}>
                {breeds.map((breed: Breed) => {
                    return (
                        <Box key={breed.id}>
                            <h5 style={{ textAlign: 'center' }}>
                                {breed.name}
                            </h5>
                            <StyledGridItem
                                onClick={() => handleItemClick(breed)}
                                width={GRID_ITEM_SMALL_SIZE}
                                height={GRID_ITEM_SMALL_SIZE}
                            >
                                <img src={breed?.image?.url} />
                            </StyledGridItem>
                        </Box>
                    );
                })}
            </StyledGrid>
            <BreedModal
                modalOpen={isBreedModalOpen}
                selectedBreed={selectedBreed}
                onClose={closeBreedModal}
            />
        </StyledContainer>
    );
};

export default Breeds;

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBreeds } from '../../api/breeds';
import { useAppDispatch } from '../../context/appContext';
import { Breed, SubBreed } from '../../utils/models';
import BreedModal from './modal/BreedModal.component';
import { QueryKeys } from '../../utils/enums';
import Error from '../../components/errorUI/Error.component';
import CircularProgress from '@mui/material/CircularProgress';
import { defaultQueryOptions } from '../../utils/contants';
import { StyledGrid, StyledGridItem } from '../home/Home.styled';
import { Paper } from '@mui/material';

const Breeds: React.FC = () => {
    const appDispatch = useAppDispatch();
    const [isBreedModalOpen, setIsBreedModalOpen] = useState<boolean>(false);
    const [selectedBreed, setSelectedBreed] = useState<SubBreed>({ name: '', id: '' });

    const {
        isError,
        isLoading,
        data: breeds,
    } = useQuery([QueryKeys.Breeds], getBreeds, {
        ...defaultQueryOptions,
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
        return <CircularProgress />;
    }

    return (
        <Paper sx={{ maxWidth: 1200, margin: '0 auto' }}>
            <StyledGrid>
                {breeds.map((breed: Breed, index) => {
                    return (
                        <StyledGridItem key={index} onClick={() => handleItemClick(breed)}>
                            <h5 style={{ textAlign: 'center' }}>{breed.name}</h5>
                            <img src={breed?.image?.url} />
                        </StyledGridItem>
                    );
                })}
            </StyledGrid>
            <BreedModal modalOpen={isBreedModalOpen} selectedBreed={selectedBreed} onClose={closeBreedModal} />
        </Paper>
    );
};

export default Breeds;

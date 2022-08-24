import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { StyledContainer, StyledGrid, StyledGridItem, sxButton } from './Home.styled';
import { Cat } from '../../utils/models';
import { getCats } from '../../api/cats';
import { useAppDispatch, useAppState } from '../../context/appContext';
import HomeModal from './modal/HomeModal.component';
import { QueryKeys } from '../../utils/enums';
import { getFavorites } from '../../api/favorites';
import CircularProgress from '@mui/material/CircularProgress';
import { defaultQueryOptions } from '../../utils/contants';
import Errorcomp from '../../components/errorUI/Error.component';
import { Button } from '@mui/material';

const Home: React.FC = () => {
    const [page, setPage] = useState<number>(50);
    const appDispatch = useAppDispatch();
    const { cats, selectedCat, isHomeModalOpen } = useAppState();

    const { isLoading, isFetching, isError } = useQuery([QueryKeys.Cats, page], () => getCats(page), {
        ...defaultQueryOptions,
        onSuccess: (data) => {
            appDispatch({ type: 'SET_CAT_LIST', cats: data });
        },
    });

    useQuery([QueryKeys.Favorites], getFavorites, {
        onSuccess: (data) => {
            appDispatch({ type: 'SET_FAVORITE_LIST', favorites: data ? data : [] });
        },
    });

    const handlePagination = () => {
        setPage((prev) => prev + 1);
    };

    const handleItemClick = (cat: Cat) => {
        appDispatch({ type: 'SET_SELECTED_CAT', cat });
        appDispatch({ type: 'TOGGLE_CAT_MODAL', catModal: true });
    };

    if (isError) {
        return <Errorcomp />;
    }
    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        <StyledContainer>
            <StyledGrid>
                {cats
                    ? cats.map((cat) => (
                          <StyledGridItem item key={cat.id} onClick={() => handleItemClick(cat)}>
                              <img src={cat.url} alt={cat.id} />
                          </StyledGridItem>
                      ))
                    : null}
            </StyledGrid>
            {selectedCat && <HomeModal modalOpen={isHomeModalOpen} />}
            <Button sx={sxButton} onClick={handlePagination}>
                {isFetching ? 'Fetching...' : 'Load more'}
            </Button>
        </StyledContainer>
    );
};

export default Home;

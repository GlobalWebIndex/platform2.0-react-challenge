import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { StyledGrid, StyledCat } from './Home.styled';
import { Cat } from '../../utils/models';
import { getCats } from '../../api/cats';
import { useAppDispatch, useAppState } from '../../context/appContext';
import CatModal from './modal/HomeModal.component';
import { QueryKeys } from '../../utils/enums';
import { getFavorites } from '../../api/favorites';
import CircularProgress from '@mui/material/CircularProgress';
import { defaultQueryOptions } from '../../utils/contants';
import Errorcomp from '../../components/errorUI/Error.component';

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
        <>
            <StyledGrid>
                {cats
                    ? cats.map((cat) => (
                          <StyledCat item key={cat.id} onClick={() => handleItemClick(cat)}>
                              <img src={cat.url} alt={cat.id} />
                          </StyledCat>
                      ))
                    : null}
            </StyledGrid>
            {selectedCat && <CatModal modalOpen={isHomeModalOpen} />}
            <button onClick={handlePagination}>{isFetching ? 'fetching' : 'load more'}</button>
        </>
    );
};

export default Home;

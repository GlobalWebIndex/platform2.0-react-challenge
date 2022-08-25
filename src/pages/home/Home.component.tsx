import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { sxButton } from './Home.styled';
import { Cat } from '../../utils/models';
import { getCats } from '../../api/cats';
import { useAppDispatch, useAppState } from '../../context/appContext';
import HomeModal from './modal/HomeModal.component';
import { QueryKeys } from '../../utils/enums';
import { getFavorites } from '../../api/favorites';
import { DEFAULT_QUERY_OPTIONS, GRID_COLUMN_WIDTH_SMALL, GRID_ITEM_SMALL_SIZE } from '../../utils/contants';
import Errorcomp from '../../components/errorUI/Error.component';
import { Button } from '@mui/material';
import Skeleton from '../../components/skeletons/Skeleton.component';
import { StyledContainer, StyledGrid, StyledGridItem } from '../../components/commonStyled/Common.styled';

const Home: React.FC = () => {
    const [page, setPage] = useState<number>(50);
    const appDispatch = useAppDispatch();
    const { cats, selectedCat, isHomeModalOpen } = useAppState();

    const { isLoading, isFetching, isError } = useQuery([QueryKeys.Cats, page], () => getCats(page), {
        ...DEFAULT_QUERY_OPTIONS,
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
        return <Skeleton />;
    }

    return (
        <StyledContainer>
            <StyledGrid columnWidth={GRID_COLUMN_WIDTH_SMALL}>
                {cats
                    ? cats.map((cat) => (
                          <StyledGridItem
                              item
                              key={cat.id}
                              onClick={() => handleItemClick(cat)}
                              width={GRID_ITEM_SMALL_SIZE}
                              height={GRID_ITEM_SMALL_SIZE}
                          >
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

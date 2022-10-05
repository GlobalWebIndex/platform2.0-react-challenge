import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { sxButton } from './Home.styled';
import { Cat } from '../../utils/models';
import { getCats } from '../../api/cats';
import { useAppDispatch, useAppState } from '../../context/appContext';
import HomeModal from './modal/HomeModal.component';
import { QueryKeys } from '../../utils/enums';
import { DEFAULT_QUERY_OPTIONS, GRID_COLUMN_WIDTH_SMALL, GRID_ITEM_SMALL_SIZE } from '../../utils/contants';
import Errorcomp from '../../components/errorUI/Error.component';
import { Button } from '@mui/material';
import Skeleton from '../../components/skeleton/Skeleton.component';
import { StyledContainer, StyledImageGrid, StyledImageGridItem } from '../../components/commonStyledComponents/CommonStyledComponents.styled';

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
    const [page, setPage] = useState<number>(1);
    const appDispatch = useAppDispatch();
    const { cats, selectedCat, isHomeModalOpen } = useAppState();

    const { isLoading, isFetching, isError } = useQuery([QueryKeys.Cats, page], () => getCats(page), {
        ...DEFAULT_QUERY_OPTIONS,
        onSuccess: (data) => {
            appDispatch({ type: 'SET_CAT_LIST', cats: data });
        },
    });

    const handleLoadMoreButtonClick = () => {
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
            <StyledImageGrid columnWidth={GRID_COLUMN_WIDTH_SMALL}>
                {cats
                    ? cats.map((cat) => (
                          <StyledImageGridItem
                              item
                              key={cat.id}
                              onClick={() => handleItemClick(cat)}
                              width={GRID_ITEM_SMALL_SIZE}
                              height={GRID_ITEM_SMALL_SIZE}
                          >
                              <img src={cat.url} alt={cat.id} data-testid="cat" />
                          </StyledImageGridItem>
                      ))
                    : null}
            </StyledImageGrid>
            {selectedCat && <HomeModal modalOpen={isHomeModalOpen} />}
            <Button sx={sxButton} onClick={handleLoadMoreButtonClick} disabled={isFetching}>
                {isFetching ? 'Fetching...' : 'Load more'}
            </Button>
        </StyledContainer>
    );
};

export default Home;

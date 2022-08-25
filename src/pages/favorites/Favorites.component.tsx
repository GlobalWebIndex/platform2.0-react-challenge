import { useAppState } from '../../context/appContext';
import FavoriteItem from './favoriteItem/FavoriteItem.component';
import { Typography } from '@mui/material';
import { StyledContainer, StyledGrid } from '../../components/commonStyled/Common.styled';
import { GRID_COLUMN_WIDTH_LARGE, GRID_ITEM_LARGE_SIZE } from '../../utils/contants';
import Skeleton from '../../components/skeletons/Skeleton.component';

const Favorites: React.FC = () => {
    const { favorites } = useAppState();
    console.log(favorites);

    if (!favorites) {
        return <Skeleton gridItemSize={GRID_ITEM_LARGE_SIZE} />;
    }

    return (
        <StyledContainer>
            {favorites.length > 0 ? (
                <StyledGrid columnWidth={GRID_COLUMN_WIDTH_LARGE}>
                    {favorites.map((favorite) => {
                        return <FavoriteItem key={favorite.id} favorite={favorite} />;
                    })}
                </StyledGrid>
            ) : (
                <Typography variant="h6" sx={{ textAlign: 'center', mt: 12 }}>
                    Looks like you do not have any favorites yet..
                </Typography>
            )}
        </StyledContainer>
    );
};

export default Favorites;

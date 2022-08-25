import { Skeleton as MuiSkeleton } from '@mui/material';
import { Box } from '@mui/system';
import { GRID_COLUMN_WIDTH_SMALL, GRID_ITEM_SMALL_SIZE } from '../../utils/contants';
import { StyledContainer, StyledGrid, StyledGridItem } from '../commonStyled/Common.styled';

interface SkeletonProps {
    title?: boolean;
    gridItemSize?: number;
    gridColumnWidth?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({
    title = false,
    gridItemSize = GRID_ITEM_SMALL_SIZE,
    gridColumnWidth = GRID_COLUMN_WIDTH_SMALL,
}) => {
    return (
        <StyledContainer>
            <StyledGrid columnWidth={gridColumnWidth}>
                {Array.apply(null, Array(10)).map((_, index) => {
                    return !title ? (
                        <Box key={index}>
                            <StyledGridItem width={gridItemSize} height={gridItemSize}>
                                <MuiSkeleton title="rectangular" animation="wave" sx={{ height: '100%' }}></MuiSkeleton>
                            </StyledGridItem>
                        </Box>
                    ) : (
                        <Box key={index}>
                            <MuiSkeleton animation="wave" sx={{ margin: '0 auto', width: 120 }}></MuiSkeleton>
                            <StyledGridItem width={gridItemSize} height={gridItemSize}>
                                <MuiSkeleton title="rectangular" animation="wave" sx={{ height: '100%' }}></MuiSkeleton>
                            </StyledGridItem>
                        </Box>
                    );
                })}
            </StyledGrid>
        </StyledContainer>
    );
};

export default Skeleton;

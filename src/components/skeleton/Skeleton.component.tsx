import { Box } from '@mui/system';
import {
    GRID_COLUMN_WIDTH_SMALL,
    GRID_ITEM_SMALL_SIZE,
} from '../../utils/contants';
import {
    StyledContainer,
    StyledImageGrid,
    StyledImageGridItem,
} from '../commonStyled/Common.styled';
import { SkeletonImage, SkeletonTitle } from './Skeleton.styled';

interface SkeletonProps {
    title?: boolean;
    gridItemSize?: number;
    gridColumnWidth?: number;
}

const SkeletonTT: React.FC<SkeletonProps> = ({
    title = false,
    gridItemSize = GRID_ITEM_SMALL_SIZE,
    gridColumnWidth = GRID_COLUMN_WIDTH_SMALL,
}) => {
    return (
        <StyledContainer>
            <StyledImageGrid columnWidth={gridColumnWidth}>
                {Array.apply(null, Array(10)).map((_, index) => {
                    return !title ? (
                        <Box key={index}>
                            <StyledImageGridItem
                                width={gridItemSize}
                                height={gridItemSize}
                            >
                                <SkeletonImage />
                            </StyledImageGridItem>
                        </Box>
                    ) : (
                        <Box key={index}>
                            <SkeletonTitle />
                            <StyledImageGridItem
                                width={gridItemSize}
                                height={gridItemSize}
                            >
                                <SkeletonImage />
                            </StyledImageGridItem>
                        </Box>
                    );
                })}
            </StyledImageGrid>
        </StyledContainer>
    );
};

export default SkeletonTT;

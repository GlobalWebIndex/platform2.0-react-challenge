import { Box, Grid } from '@mui/material';
import styled from '@emotion/styled';
import theme from '../../styles/theme';

export const StyledContainer = styled(Box)({
    maxWidth: 1200,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
});

export const StyledGrid = styled(Grid, {
    shouldForwardProp: (prop) => prop !== 'columnWidth',
})(({ columnWidth }: { columnWidth: number }) => ({
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    gridTemplateColumns: `repeat(auto-fill, ${columnWidth}px)`,
    gap: theme.spacing(4),
    padding: theme.spacing(6, 4),
}));

export const StyledGridItem = styled(Grid)(
    ({ width, height }: { width: number; height: number }) => ({
        width: width,
        height: height,
        overflow: 'hidden',
        '& img': {
            width: '100%',
            height: '100%',
            transition: 'transform 0.3s ease-out',
        },
        '& img:hover': {
            transform: 'scale(1.05)',
        },
        border: '2px solid transparent',
        borderRadius: 4,
        boxShadow: theme.shadows[6],
        '&:hover': {
            border: `2px solid ${theme.palette.primary.main}`,
        },
    })
);

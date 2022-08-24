import { Grid, Box, Paper } from '@mui/material';
import styled from '@emotion/styled';
import theme from '../../styles/theme';

export const StyledContainer = styled(Box)({
    maxWidth: 1200,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
});

export const StyledGrid = styled(Grid)({
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    gridTemplateColumns: 'repeat(auto-fill, 200px)',
    gap: theme.spacing(4),
    padding: theme.spacing(6, 4),
});

export const StyledGridItem = styled(Grid)(() => ({
    width: 200,
    height: 200,
    '& img': {
        width: '100%',
        height: '100%',
    },
    boxShadow: theme.shadows[6],
}));

export const StyledBox = styled(Box)(() => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
}));

export const sxButton = {
    margin: '16px auto 32px auto',
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    textTransform: 'none',
    '&:hover': {
        backgroundColor: theme.palette.primary.light,
    },
};

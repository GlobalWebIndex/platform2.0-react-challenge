import { Grid, Box } from '@mui/material';
import styled from '@emotion/styled';

export const StyledGrid = styled.div({
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    gridTemplateColumns: 'repeat(auto-fill, 200px)',
    gap: '20px',
    padding: '20px 40px',
});

export const StyledCat = styled(Grid)(() => ({
    width: 200,
    height: 200,
    '& img': {
        width: '100%',
        height: '100%',
    },
}));

export const StyledBox = styled(Box)(() => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
}));

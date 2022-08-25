import { Grid, Box, Paper } from '@mui/material';
import styled from '@emotion/styled';
import theme from '../../styles/theme';

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

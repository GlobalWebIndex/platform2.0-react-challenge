import styled from '@emotion/styled';
import { Button, ButtonBaseProps, Theme } from '@mui/material';

export interface StyledButtonProps extends ButtonBaseProps {
    active: boolean;
    theme: Theme;
}

export const StyledButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'active',
})<StyledButtonProps>(({ active, theme }) => ({
    textTransform: 'capitalize',
    fontSize: '16px',
    color: active ? theme.palette.grey[50] : theme.palette.grey[200],
    borderRadius: 0,
    borderBottom: active
        ? `2px  solid ${theme.palette.grey[50]}`
        : '2px solid transparent',
    '&:hover': {
        background: 'transparent',
        borderBottom: `2px  solid ${theme.palette.primary.contrastText}`,
        color: theme.palette.primary.contrastText,
    },
}));

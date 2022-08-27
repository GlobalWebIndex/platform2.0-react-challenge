import styled from '@emotion/styled';
import { Button, ButtonBaseProps, Theme } from '@mui/material';

export interface StyledButtonProps extends ButtonBaseProps {
    active: boolean;
    theme: Theme;
}

export const StyledButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'active',
})<StyledButtonProps>(({ active, theme }) => ({
    color: active ? theme.palette.grey[50] : theme.palette.grey[400],
    borderRadius: 0,
    borderBottom: active
        ? `2px  solid ${theme.palette.grey[50]}`
        : '2px solid transparent',
    '&:hover': {
        borderBottom: `2px  solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main,
    },
}));

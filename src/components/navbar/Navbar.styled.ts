import styled from '@emotion/styled';
import { Button, ButtonBaseProps } from '@mui/material';

export interface StyledButtonProps extends ButtonBaseProps {
    active: number;
}

export const StyledButton = styled(Button)<StyledButtonProps>(({ active }) => ({
    color: active === 1 ? 'red' : 'green',
    borderRadius: 0,
    borderBottom: active === 1 ? '2px  solid white' : '2px solid transparent',
    '&:hover': {
        borderBottom: '2px solid white',
        color: '#fff',
    },
}));

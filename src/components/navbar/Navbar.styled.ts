import styled from '@emotion/styled';
import { Button } from '@mui/material';

export const StyledButton = styled(Button)(({ active }: { active: boolean }) => ({
    color: active ? '#fff' : '#ddd',
    borderRadius: 0,
    borderBottom: active ? '2px  solid white' : '2px solid transparent',
    '&:hover': {
        borderBottom: '2px solid white',
        color: '#fff',
    },
}));

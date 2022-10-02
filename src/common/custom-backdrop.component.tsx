import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface IComponentProps {
    isLoading: boolean;
}

export function CustonBackdropComponent(props: IComponentProps) {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={props.isLoading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}
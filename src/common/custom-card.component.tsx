
import React from 'react';
import Card from '@mui/material/Card';
import { CustonBackdropComponent } from './custom-backdrop.component';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadious: 10
};

interface IComponentProps {
    isLoading: boolean;
}

export function CustomCardComponent(props: React.PropsWithChildren<IComponentProps>) {
    return (
        <>
            <CustonBackdropComponent isLoading={props.isLoading} />
            <Card sx={style} >
                {props.children}
            </Card>
        </>
    )
}
import React from 'react';
import { CustomCardComponent } from '../../common/custom-card.component';
import { ICatBreed } from '../../services/image.storage'
import { Link } from "react-router-dom"
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';;

interface IComponentProps {
    breed: ICatBreed
    handleClose(): void

}

export function BreedDetailsComponent(props: IComponentProps) {
    return (
        <>
            <Modal
                open
                onClose={props.handleClose}
            >
                <CustomCardComponent isLoading={false}>
                    <CardMedia
                        component="img"
                        src={props.breed.image.url}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {props.breed.description}
                        </Typography>
                    </CardContent>
                    <CardActions >
                        <Button variant="text" component={Link} to={"/photos/" + props.breed.id}>{"See photos of " + props.breed.name + " cats"}</Button>
                    </CardActions>
                </CustomCardComponent>
            </Modal>
        </>
    )
}

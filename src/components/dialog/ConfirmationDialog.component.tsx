import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Typography,
} from '@mui/material';
import React, { SetStateAction, useEffect, useState } from 'react';

interface IConfirmationDialogProps {
    dialogOpen: boolean;
    onConfirm(): void;
    setIsDialogOpen: React.Dispatch<SetStateAction<boolean>>;
}

export const ConfirmationDialog: React.FC<IConfirmationDialogProps> = ({
    dialogOpen,
    onConfirm,
    setIsDialogOpen,
}) => {
    const handleConfirmClick = (): void => {
        setIsDialogOpen(false);
        onConfirm();
    };

    const handleCloseClick = (): void => {
        setIsDialogOpen(false);
    };

    return (
        <Dialog
            open={dialogOpen}
            onClose={handleCloseClick}
        >
            <DialogContent
                style={{ textAlign: 'center', wordWrap: 'break-word' }}
            >
                <Typography>
                    Are you sure you want to delete this one?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseClick}>Cancel</Button>
                <Button
                    onClick={handleConfirmClick}
                    color="primary"
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

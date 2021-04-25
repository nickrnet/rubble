import React from 'react';

import { Dialog, DialogTitle, Typography } from '@material-ui/core';

export default function Winner ({ gameOver, winner }) {
    return (
        <Dialog
            open={gameOver}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <Typography>
                    {`${winner} won!`}
                </Typography>
            </DialogTitle>
        </Dialog>
    );
}

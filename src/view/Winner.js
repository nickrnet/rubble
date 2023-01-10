import React from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';

export default function Winner (
    {
        roundOver,
        roundWinner,
        gameWinner,
        setRoundOver,
        endRound
    }
) {

    function closeHandler() {
        setRoundOver(false);
        endRound();
    }

    return (
        <Dialog
            open={roundOver}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <Typography>
                    {gameWinner ? 'Game Over' : 'Round Over'}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Typography>
                    {`${roundWinner} won!`}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={closeHandler}>
                    Continue
                </Button>
            </DialogActions>
        </Dialog>
    );
}

import React from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';

export default function Winner (
    {
        newGameHandler,
        roundOver,
        roundWinner,
        gameOver,
        gameWinner,
        setRoundOver
    }
) {

    function closeHandler() {
        newGameHandler(true);
        setRoundOver(false);
    }

    return (
        <Dialog
            open={ roundOver }
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <Typography>
                    { `Round Over` }
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Typography>
                    { `${roundWinner} won!` }
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={ closeHandler }>
                    Continue
                </Button>
            </DialogActions>
        </Dialog>
    );
}

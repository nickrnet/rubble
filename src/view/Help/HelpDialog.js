import React from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';

import HelpStepper from './HelpStepper';

export default function HelpDialog(
    {
        viewHelp,
        setViewHelp
    }
) {

    function closeHandler() {
        setViewHelp(false);
    }

    return(
        <Dialog
            open={viewHelp}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <Typography>
                    Garbage Game Rules
                </Typography>
            </DialogTitle>
            <DialogContent>
                <HelpStepper
                    closeHelp={closeHandler} />
            </DialogContent>
        </Dialog>
    );
}

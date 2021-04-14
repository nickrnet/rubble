import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';

const useStyles = makeStyles(
    (theme) => (
        {
            dealButton: {
                backgroundColor: '#61dafb',
            }
        }
    )
);

export default function DealButton({ dealHandler, enabled }) {
    const classes = useStyles();

    return (
        <Button className={classes.dealButton} disabled={enabled} onClick={dealHandler}>
            <Typography>Deal</Typography>
        </Button>
    );
}

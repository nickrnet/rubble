import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(
    (theme) => (
        {
            shuffleButton: {
                backgroundColor: '#61dafb',
            }
        }
    )
);

export default function ShuffleButton ({ enabled, shuffleHandler }) {
    const classes = useStyles();

    return (
        <Button className={ classes.shuffleButton } disabled={ enabled } onClick={ shuffleHandler }>
            <Typography>Shuffle</Typography>
        </Button>
    );
}

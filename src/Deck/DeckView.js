import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import IndividualCardBack from '../view/IndividualCardBack';
import EmptyCardSlot from '../view/EmptyCardSlot';

const useStyles = makeStyles(
    (theme) => (
        {
            title: {
                fontSize: 24
            }
        }
    )
);

export default function DeckView({ cards, drawFromDeckHandler }) {
    const classes = useStyles();

    function onCardClick () {
        if (drawFromDeckHandler && cards.length) {
            drawFromDeckHandler();
        }
    }

    return (
        <Grid container direction="row" justify="center" alignItems="flex-start" spacing={2}>
            <Grid item>
                <Typography variant="h6" component="h1" className={classes.title} gutterBottom>Deck</Typography>
            </Grid>
            <Grid item onClick={ onCardClick }>
                { cards.length ? 
                <IndividualCardBack /> :
                <EmptyCardSlot />
                }
            </Grid>
        </Grid>
    );
}

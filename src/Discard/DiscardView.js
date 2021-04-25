import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import IndividualCardFront from '../view/IndividualCardFront';
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

export default function DiscardView ({ cards, drawFromDiscardHandler }) {
    const classes = useStyles();
    const card = cards[cards.length - 1];
    let lastDiscard;

    if (card) {
        lastDiscard = <Grid item key={`${card.value}_${card.suit}`}><IndividualCardFront card={card} onClick={drawFromDiscardHandler} /></Grid>
    }
    else {
        lastDiscard = <Grid item><EmptyCardSlot /></Grid>;
    }
    
    return (
        <Grid container direction="row" justify="center" alignItems="flex-start" spacing={2}>
            <Grid item>
                <Typography variant="h6" component="h1" className={classes.title} gutterBottom>Discard</Typography>
            </Grid>
        <Grid item>
            <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                {
                    lastDiscard
                }
            </Grid>
        </Grid>
    </Grid>
    );
}

import React, {useEffect} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import IndividualCardBack from '../view/IndividualCardBack';
import EmptyCardSlot from '../view/EmptyCardSlot';

const useStyles = makeStyles (
    (theme) => (
        {
            title: {
                fontSize: 24
            }
        }
    )
);

export default function DeckView (
    {
        deckCards,
        player,
        playerDrawFromDeck
    }
) {
    const classes = useStyles();

    return (
        <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={ 2 }>
            <Grid item>
                <Typography variant="h6" component="h1" className={ classes.title } gutterBottom>Deck</Typography>
            </Grid>
            <Grid item>
                { deckCards.length ? 
                <IndividualCardBack onClick={ playerDrawFromDeck } /> :
                <EmptyCardSlot />
                }
            </Grid>
        </Grid>
    );
}

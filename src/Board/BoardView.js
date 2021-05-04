import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Paper, Typography } from '@material-ui/core';

import DeckController from '../Deck/DeckController';
import DiscardController from '../Discard/DiscardController';
import IndividualPlayerView from '../Player/IndividualPlayerView';
import Winner from '../view/Winner';

const useStyles = makeStyles(
    (theme) => (
        {
            buttonColor: {
                color: '#282c34',
                backgroundColor: 'orange'
            },
            gameBoard: {
                backgroundColor: '#282c34',
                color: 'white',
                padding: 5
            },
            title: {
                fontSize: 36
            }
        }
    )
);

export default function BoardView({ players, deck, discard, drawFromDeckHandler, drawFromDiscardHandler, placeCardHandler, gameOver, winner }) {
    const classes = useStyles();

    return (
        <Paper elevation={3} className={classes.gameBoard}>
            <Winner gameOver={gameOver} winner={winner} />
            <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
                <Grid item>
                    <Typography variant="h5" component="h1" className={classes.title} gutterBottom>
                        Rubble
                    </Typography>
                </Grid>
                <Grid item>
                    <Grid container spacing={2} direction="row" justify="center" alignItems="center">
                        <Grid item>
                            <IndividualPlayerView player={players[0]} placeCardHandler={placeCardHandler}/>
                        </Grid>
                        <Grid item>
                            <IndividualPlayerView player={players[1]} placeCardHandler={placeCardHandler}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container spacing={2} dicrection="row" justify="center" alignItems="center">
                        <Grid item>
                            <DeckController deck={deck} drawFromDeckHandler={drawFromDeckHandler}/>
                        </Grid>
                        <Grid item>
                            <DiscardController discard={discard} drawFromDiscardHandler={drawFromDiscardHandler}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container spacing={2} direction="row" justify="center" alignItems="center">
                        <Grid item>
                            <IndividualPlayerView player={players[2]} placeCardHandler={placeCardHandler}/>
                        </Grid>
                        <Grid item>
                            <IndividualPlayerView player={players[3]} placeCardHandler={placeCardHandler} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';

import IndividualPlayerView from '../Player/IndividualPlayerView';
import Winner from '../view/Winner';
import DeckView from '../Deck/DeckView';
import DiscardView from '../Discard/DiscardView';

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

function generatePlayerView(player, isActive, playerDrawFromDeck, playerDiscard, playerPlaceCard, dealing) {
    return (
        <IndividualPlayerView
            player={player}
            isActive={isActive}
            playerDrawFromDeck={playerDrawFromDeck}
            playerDiscard={playerDiscard}
            playerPlaceCard={playerPlaceCard}
            dealing={dealing} />
    );
}

export default function BoardView (
    {
        playersList,
        deckCards,
        discardCards,
        round,
        activePlayerIndex,
        playerDrawFromDeck,
        playerDiscard,
        playerDrawFromDiscard,
        playerPlaceCard,
        dealing,
        endRound,
        roundOver,
        setRoundOver,
        roundWinner,
        gameOver,
        gameWinner
    }
) {
    const classes = useStyles();

    return (
        <Paper
            elevation={3}
            className={classes.gameBoard} >
            <Winner
                roundOver={roundOver}
                setRoundOver={setRoundOver}
                roundWinner={roundWinner}
                gameOver={gameOver}
                gameWinner={gameWinner}
                endRound={endRound}
                />
            <Grid 
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={3} >
                <Grid item>
                    <Typography
                        variant="h5"
                        component="h1"
                        className={classes.title}
                        gutterBottom >
                        Round {round}
                    </Typography>
                </Grid>
                <Grid item>
                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        justifyContent="center"
                        alignItems="center" >
                        <Grid item>
                            {generatePlayerView(
                                playersList[0],
                                activePlayerIndex == 0,
                                playerDrawFromDeck,
                                playerDiscard,
                                playerPlaceCard,
                                dealing)}
                        </Grid>
                        <Grid item>
                            <IndividualPlayerView
                                player={playersList[1]}
                                isActive={activePlayerIndex == 1}
                                playerDrawFromDeck={playerDrawFromDeck}
                                playerDiscard={playerDiscard}
                                playerPlaceCard={playerPlaceCard}
                                dealing={dealing} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid
                        container
                        spacing={2}
                        dicrection="row"
                        justifyContent="center"
                        alignItems="center" >
                        <Grid item>
                            <DeckView
                                deckCards={deckCards}
                                playerDrawFromDeck={playerDrawFromDeck} />
                        </Grid>
                        <Grid item>
                            <DiscardView
                                discardCards={discardCards}
                                playerDrawFromDiscard={playerDrawFromDiscard} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        justifyContent="center"
                        alignItems="center" >
                        <Grid item>
                            <IndividualPlayerView
                                player={playersList[2]}
                                isActive={activePlayerIndex == 2}
                                playerDrawFromDeck={playerDrawFromDeck}
                                playerDiscard={playerDiscard}
                                playerPlaceCard={playerPlaceCard}
                                dealing={dealing} />
                        </Grid>
                        <Grid item>
                            <IndividualPlayerView
                                player={playersList[3]}
                                isActive={activePlayerIndex == 3}
                                playerDrawFromDeck={playerDrawFromDeck}
                                playerDiscard={playerDiscard}
                                playerPlaceCard={playerPlaceCard}
                                dealing={dealing} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}

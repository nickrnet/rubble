import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton, Paper, Typography } from '@material-ui/core';
import DeleteForever from '@material-ui/icons/DeleteForever';
import LocalPlay from '@material-ui/icons/LocalPlay';

import EmptyCardSlot from '../view/EmptyCardSlot';
import IndividualCard from '../view/IndividualCard';

const useStyles = makeStyles(
    (theme) => (
        {
            playerCard: {
                padding: 5
            },
            playingCardContent: {
                minHeight: 170,
                maxHeight: 170,
                minWidth: 110,
                maxWidth: 110
            },
            title: {
                alignItems: 'center',
                fontSize: 24
            }
        }
    )
);

function topRowSlots(player) {
    let slotCards = [];

    for (let i = 1; i <= 5; i++) {
        let key = `${player.name}_${i}`;
        if (i <= player.slots) {
            if (player.cards && player.cards[i - 1]) {
                slotCards.push(<Grid item key={key}><IndividualCard card={player.cards[i - 1]} /></Grid>);
            }
            else {
                slotCards.push(<Grid item key={key}><EmptyCardSlot empty={false} /></Grid>);
            }
        }
        else {
            slotCards.push(<Grid item key={key}><EmptyCardSlot empty={true} /></Grid>);
        }
    }
    return (
        <Grid container spacing={3} direction="row" justify="center" alignItems="center">
            {slotCards}
        </Grid>
    );
}

function bottomRowSlots(player) {
    let slotCards = [];

    for (let i = 6; i <= 10; i++) {
        let key = `${player.name}_${i}`;
        if (i <= player.slots) {
            if (player.cards && player.cards[i - 1]) {
                slotCards.push(<Grid item key={key}><IndividualCard card={player.cards[i - 1]} /></Grid>);
            }
            else {
                slotCards.push(<Grid item key={key}><EmptyCardSlot empty={false} /></Grid>);
            }
        }
        else {
            slotCards.push(<Grid item key={key}><EmptyCardSlot empty={true} /></Grid>);
        }
    }

    return (
        <Grid container spacing={3} direction="row" justify="center" alignItems="center">
            {slotCards}
        </Grid>
    );
}

export default function IndividualPlayerView({ player, discardHandler, placeCardHandler }) {
    const classes = useStyles();

    function discard() {
        if (player.card && player.card.value > 0) {
            discardHandler(player);
        }
    }

    function placeCard() {
        if (player.card && player.card.value > 0) {
            placeCardHandler(player);
        }
    }

    return (
        <Grid item>
            <Paper className={classes.playerCard}>
                <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
                    <Grid item>
                        <Typography variant="h5" component="h1" className={classes.title} gutterBottom>
                            { player.isTurn && <LocalPlay /> }
                                {/* <EditAttributes />
                                <Feedback />
                                <Flare />
                                <HowToReg />
                                <ImportExport />
                                <Input />
                                <LocalPlay */}
                            {player.name}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
                            {/* <Grid item>
                                <Typography>Current Card</Typography>
                            </Grid> */}
                            <Grid item onClick={placeCard}>
                                {
                                    player.card ? <IndividualCard card={player.card} /> : <EmptyCardSlot />
                                }
                            </Grid>
                            {/* <Grid item>
                                <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                                    <Grid item>
                                        <IconButton onClick={discard} disabled={!(player.card && player.card.value > 0)}>
                                            <DeleteForever /> 
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid> */}
                        </Grid>
                    </Grid>
                    <Grid item>
                        {topRowSlots(player)}
                    </Grid>
                    <Grid item>
                        {bottomRowSlots(player)}
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}

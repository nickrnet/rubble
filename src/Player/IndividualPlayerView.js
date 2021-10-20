import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import LocalPlay from '@material-ui/icons/LocalPlay';

import EmptyCardSlot from '../view/EmptyCardSlot';
import IndividualCard from '../view/IndividualCard';

const useStyles = makeStyles(
    (theme) => (
        {
            activePlayerCard: {
                padding: 5,
                backgroundColor: "#E3F2FD"
            },
            inactivePlayerCard: {
                padding: 5,
                backgroundColor: "#3e4551"
            },
            playingCardContent: {
                minHeight: 150,
                maxHeight: 150,
                minWidth: 90,
                maxWidth: 90
            },
            title: {
                alignItems: 'center',
                fontSize: 24
            }
        }
    )
);

function topRowSlots (player, stealCardHandler) {
    let slotCards = [];

    for (let i = 1; i <= 5; i++) {
        let key = `${player.name}_${i}`;
        if (i <= player.slots) {
            if (player.cards && player.cards[i - 1]) {
                slotCards.push(<Grid item key={key}><IndividualCard card={player.cards[i - 1]} onClick={ stealCardHandler } slot={ i - 1 } /></Grid>);
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

function bottomRowSlots (player, stealCardHandler) {
    let slotCards = [];

    for (let i = 6; i <= 10; i++) {
        let key = `${player.name}_${i}`;
        if (i <= player.slots) {
            if (player.cards && player.cards[i - 1]) {
                slotCards.push(<Grid item key={key}><IndividualCard card={player.cards[i - 1]} onClick={ stealCardHandler } slot={ i - 1 } /></Grid>);
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

export default function IndividualPlayerView(
    {
        player,
        placeCardHandler,
        stealCardHandler
    }
) {
    const classes = useStyles();

    function placeCard() {
        if (player.card && player.card.value > 0) {
            placeCardHandler(player);
        }
    }

    function stealCard(slot) {
        stealCardHandler(player, slot);
    }

    return (
        <Grid item>
            <Paper className={player.isTurn ? classes.activePlayerCard : classes.inactivePlayerCard}>
                <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
                    <Grid item>
                        <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                            <Grid item>
                                <Typography variant="h5" component="h1" className={classes.title} gutterBottom>
                                    { player.isTurn && <LocalPlay /> }
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h5" component="h1" className={classes.title} gutterBottom>
                                    { player.name }
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
                            <Grid item>
                                {
                                    player.card ? <IndividualCard card={player.card} onClick={ placeCard } /> : <EmptyCardSlot />
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        {topRowSlots(player, stealCard)}
                    </Grid>
                    <Grid item>
                        {bottomRowSlots(player, stealCard)}
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}

import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LocalPlay from '@material-ui/icons/LocalPlay';

import EmptyCardSlot from '../view/EmptyCardSlot';
import IndividualCard from '../view/IndividualCard';
import { CheckBox } from '@material-ui/icons';

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

function topRowSlots (player,  playerPlaceCard) {
    let slotCards = [];

    for (let i = 1; i <= 5; i++) {
        let key = `${player ? player.name : ''}_${i}`;
        if (player && i <= player.slots) {
            if (player.cards && player.cards[i - 1]) {
                slotCards.push(<Grid item key={key}><IndividualCard card={player.cards[i - 1]} slot={ i - 1 } onClick={() => {playerPlaceCard(i-1)}} /></Grid>);
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
        <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
            {slotCards}
        </Grid>
    );
}

function bottomRowSlots (player, playerPlaceCard) {
    let slotCards = [];

    for (let i = 6; i <= 10; i++) {
        let key = `${player ? player.name : ''}_${i}`;
        if (player && i <= player.slots) {
            if (player.cards && player.cards[i - 1]) {
                slotCards.push(<Grid item key={key}><IndividualCard card={player.cards[i - 1]} slot={ i - 1 } onClick={() => {playerPlaceCard(i-1)}} /></Grid>);
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
        <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
            {slotCards}
        </Grid>
    );
}

export default function IndividualPlayerView(
    {
        player,
        isActive,
        playerDrawFromDeck,
        playerDiscard,
        playerPlaceCard,
        dealing
    }
) {

    const classes = useStyles();

    return (
        <Grid item>
            <Paper className={isActive && !dealing ? classes.activePlayerCard : classes.inactivePlayerCard}>
                <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
                    <Grid item>
                        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1}>
                            <Grid item>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled
                                                checked={player ? player.isAuto : true} />
                                        }
                                        label={player ? player.playerName : ''} />
                                </FormGroup>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
                            <Grid item>
                                { player && player.card ? 
                                <IndividualCard card={player.card} onClick={playerDiscard}/> :
                                <EmptyCardSlot onClick={playerDrawFromDeck} />
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        {topRowSlots(player, playerPlaceCard)}
                    </Grid>
                    <Grid item>
                        {bottomRowSlots(player, playerPlaceCard)}
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}

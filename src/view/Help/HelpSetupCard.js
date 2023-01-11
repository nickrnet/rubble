import React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function HelpSetupCard() {
    return (
        <CardContent maxheight={300}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Setup
            </Typography>
            <Typography paragraph variant="body2">
                One or more Deck(s) of Cards, Jokers removed.
            </Typography>
            <Typography paragraph variant="body2">
                Designate a dealer, whose responsibilities will be passed to the left after each round.
            </Typography>
            <Typography paragraph variant="body2">
                Deal 10 cards, facedown to each player.
            </Typography>
            <Typography paragraph variant="body2">
                Assemble into two rows of 5 (2x5 grid).
            </Typography>
        </CardContent>
    );
}
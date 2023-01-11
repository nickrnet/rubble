import * as React from 'react';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function HelpGamePlayCard() {
    return (
        <CardContent maxheight={300}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Game Play
            </Typography>
            <Typography paragraph variant="body2">
                The aim of the game is to fill each of the facedown card slots with the corresponding card, Ace through 10. (Ace-5 is the top row, 6-10 is the bottom row).
            </Typography>
            <Typography paragraph variant="body2">
                Each turn, the player will either draw a card from the deck or draw the top card of the discard depending on its value (See Specific Rules).
            </Typography>
            <Typography paragraph variant="body2">
                Then, play the card in its corresponding place in the grid. If there is no place available in the grid, discard the card and pass your turn.
            </Typography>
            <Typography paragraph variant="body2">
                If the card was played, flip the facedown card that the played card replaced in the grid. You may now play that card. If there is no place available in the grid, discard the card and pass your turn.
            </Typography>
            <Typography paragraph variant="body2">
                Once you have filled the grid with the corresponding cards, the round is over.
            </Typography>
            <Typography paragraph variant="body2">
                In the next round, the winner of the previous round is dealt one fewer card in their grid (The winner will have a grid from 1-9 whereas other players have a grid from 1-10).
            </Typography>
            <Typography paragraph variant="body2">
                The player to the left of the previous winner starts the new round.
            </Typography>
            <Typography paragraph variant="body2">
                The game ends when <br />
                - one player has only one slot left (won 9 rounds), and <br />
                - fills it with an Ace.
            </Typography>
        </CardContent>
    );
}
import * as React from 'react';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function HelpGamePlayCard() {
    return (
        <CardContent maxheight={300}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Specific Rules
            </Typography>
            <Typography paragraph variant="body2">
                The face cards have different abilities than the number cards.
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                King
            </Typography>
            <Typography paragraph variant="body2">
                The King is a wild card and may be played on any available slot in the grid.
            </Typography>
            <Typography paragraph variant="body2">
                The King cannot fill the ace slot of the final round (player has only one slot left).
            </Typography>
            <Typography paragraph variant="body2">
                The King cannot fill the ace slot of the final round (player has only one slot left).
            </Typography>
            <Typography paragraph variant="body2">
                Kings can be replaced by a number card corresponding to the space occupied, and played again as if it had been drawn.
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Queen
            </Typography>
            <Typography paragraph variant="body2">
                The Queen is a steal card.
            </Typography>
            <Typography paragraph variant="body2">
                The player of the Queen selects a card from any of their opponent(s) played cards and replaces it with the Queen, taking the number and playing it in their own grid.
            </Typography>
            <Typography paragraph variant="body2">
                A player may have any number of cards in their grid replaced by Queens.
            </Typography>
            <Typography paragraph variant="body2">
                A player cannot win the given round if there is a Queen within their grid.
            </Typography>
            <Typography paragraph variant="body2">
                Queens can be taken out of a grid, and played as if they had been drawn, if the player plays a number that corresponds with the space the Queen occupies.
            </Typography>
            <Typography paragraph variant="body2">
                Kings may replace Queens, which are played as if they had been drawn.
            </Typography>
            <Typography paragraph variant="body2">
                The Queen may not steal a King from an opponent.
            </Typography>
            <Typography paragraph variant="body2">
                If the opponent(s) do not have any cards played, then the Queen is discarded and the turn is passed.
            </Typography>
            <Typography paragraph variant="body2">
                A discarded Queen may be taken from the discard and played.
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Jack
            </Typography>
            <Typography paragraph variant="body2">
                The Jack has no point value.
            </Typography>
            <Typography paragraph variant="body2">
                Jacks must be immediately discarded, and the turn is passed.
            </Typography>
        </CardContent>
    );
}

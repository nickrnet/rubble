import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles(
    (theme) => (
        {
            playingCardBorder: {
                minHeight: 170,
                maxHeight: 170,
                minWidth: 110,
                maxWidth: 110,
            },
            playingCardContent: {
                minHeight: 170,
                maxHeight: 170,
                minWidth: 110,
                maxWidth: 110,
            },
            pos: {
                marginBottom: 12,
            }
        }
    )
);

function getNameAbbreviation (card) {
    if (typeof card.name !== 'string') return 'Mystery';
    if ([2, 3, 4, 5, 6, 7, 8, 9, 10].includes(card.value)) {
        return card.name;
    }
    else {
        return card.name.charAt(0).toUpperCase();
    }
    
}

export default function IndividualCardFront ({ card }) {
    const classes = useStyles();

    return (
        <Card raised={ true } className={ classes.playingCardBorder }>
            <CardContent className={ classes.playingCardContent }>
                <Typography variant="h5" component="h2">
                    { getNameAbbreviation(card) }
                </Typography>
                <Typography className={ classes.pos } color="textSecondary">
                    { card.suit }
                </Typography>
            </CardContent>
        </Card>
    );
}

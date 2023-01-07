import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardMedia, Typography } from '@material-ui/core';

const useStyles = makeStyles(
    (theme) => (
        {
            playingCardArea: {
                width: 90,
                height: 130
            },
            playingCardMedia: {
                paddingTop: '25%',
                paddingBottom: '25%'
            }
        }
    )
);

function getCardImage (card) {
    let image;
    if (card && card.name) {
        if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(card.value)) {
            image = `${card.name.toLowerCase()}_of_${card.suit.toLowerCase()}.png`;
        }
        else {
            image = `${card.name.toLowerCase()}_of_${card.suit.toLowerCase()}2.png`;
        }
        return image;
    }

}

export default function IndividualCardFront ({ card, onClick }) {
    const classes = useStyles();

    return (
        <Card raised={ card.canBeStolen } onClick={ onClick } >
            <CardActionArea className={classes.playingCardArea}>
                <CardMedia
                    component="img"
                    alt={`${card.name} of ${card.suit}`}
                    image={`cards/${getCardImage(card)}`}
                    title={`${card.name} of ${card.suit}`}/>
            </CardActionArea>
        </Card>
    );
}

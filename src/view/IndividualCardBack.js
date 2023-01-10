import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardMedia } from '@material-ui/core';

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

export default function IndividualCardBack ({ onClick }) {
    const classes = useStyles();

    return (
        <Card raised={ false } className={ classes.playingCardArea } onClick={onClick} >
            <CardActionArea>
                <CardMedia
                    className={classes.playingCardMedia}
                    component="img"
                    alt="Back of Card"
                    image="/logo192.png"
                    // disabled={!onClick}
                    title="Back of Card" />
            </CardActionArea>
        </Card>
    );
}

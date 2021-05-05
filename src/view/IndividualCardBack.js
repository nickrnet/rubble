import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardMedia } from '@material-ui/core';

const useStyles = makeStyles(
    (theme) => (
        {
            playingCardArea: {
                width: 115,
                height: 167
            },
            playingCardMedia: {
                // width: 115,
                // height: 167,
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
                    disabled={!onClick}
                    title="Back of Card" />
            </CardActionArea>
        </Card>
    );
}

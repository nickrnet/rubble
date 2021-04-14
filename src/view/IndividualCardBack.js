import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { ButtonBase, Card, CardContent } from '@material-ui/core';

const useStyles = makeStyles(
    (theme) => (
        {
            image: {
                width: 80,
                height: 80,
            },
            img: {
              margin: 'auto',
              display: 'block',
              maxWidth: '100%',
              maxHeight: '100%',
            },
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
            }
        }
    )
);

export default function IndividualCardBack () {
    const classes = useStyles();

    return (
        <Card raised={ true } className={ classes.playingCardBorder }>
            <CardContent className={ classes.playingCardContent }>
                <ButtonBase className={classes.image}>
                    <img className={classes.img} alt="complex" src="/logo192.png" />
                </ButtonBase>
            </CardContent>
        </Card>
    );
}

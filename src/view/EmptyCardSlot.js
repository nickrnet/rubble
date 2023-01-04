import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles(
    (theme) => (
        {
            playingCardBorder: {
                width: 90,
                height: 130
            },
            playingCardContent: {
                width: 90,
                height: 130,
                backgroundColor: '#61dafb',
            },
            playingCardEmptyContent: {
                width: 90,
                height: 130,
                backgroundColor: 'lightGray',
            }
        }
    )
);

export default function EmptyCardSlot (props) {
    const classes = useStyles();
    let style = null;
    if (props.empty) {
        style = classes.playingCardEmptyContent
    }
    else {
        style = classes.playingCardContent;
    }

    return (
        <Card raised={ !props.empty } className={ classes.playingCardBorder } onClick={props.onClick}>
            <CardContent className={ style } />
        </Card>
    );
} 

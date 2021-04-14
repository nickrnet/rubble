import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

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
                backgroundColor: '#61dafb',
            },
            playingCardEmptyContent: {
                minHeight: 170,
                maxHeight: 170,
                minWidth: 110,
                maxWidth: 110,
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
        <Card raised={ !props.empty } className={ classes.playingCardBorder }>
            <CardContent className={ style } />
        </Card>
    );
} 

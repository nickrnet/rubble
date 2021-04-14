import React from 'react';

import IndividualCardFront from './IndividualCardFront';
import IndividualCardBack from './IndividualCardBack';

export default function IndividualCard (props) {
    if (props.card.faceUp) {
        return (
            <IndividualCardFront card={props.card} />
        );
    }
    else {
        return (
            <IndividualCardBack />
        );
    }
}

import React from 'react';

import IndividualCardFront from './IndividualCardFront';
import IndividualCardBack from './IndividualCardBack';

export default function IndividualCard ({ card, slot, onClick }) {
    if (card.faceUp) {
        return (
            <IndividualCardFront card={card} onClick={onClick}/>
        );
    }
    else {
        return (
            <IndividualCardBack onClick={onClick} />
        );
    }
}

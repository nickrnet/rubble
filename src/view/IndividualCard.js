import React from 'react';

import IndividualCardFront from './IndividualCardFront';
import IndividualCardBack from './IndividualCardBack';

export default function IndividualCard ({ card, slot, onClick }) {

    function stealCard() {
        onClick(slot);
    }

    if (card.faceUp) {
        return (
            <IndividualCardFront card={card} onClick={ stealCard }/>
        );
    }
    else {
        return (
            <IndividualCardBack />
        );
    }
}

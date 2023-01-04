import React, { useEffect, useState } from 'react';

import CardController from '../Card/CardController';

export default function SuitController (
    name
) {
    const [cards, setCards] = useState([]);
    const [maxCardsInSuit, setMaxCardsInSuit] = useState(13);

    function emptySuit () {
        return (<div></div>);
    }

    function init () {
        if (!name) return emptySuit();
        if (!cards.length) {
            for (let i = 1; i <= maxCardsInSuit; i++) {
                setCards([...cards, new CardController(name, i)]);
            }
        }
    }

    init();

    return emptySuit();
}

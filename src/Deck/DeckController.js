import React, { useEffect, useState } from 'react';

import Suit from '../Suit.js';
import DeckView from './DeckView';

export default function DeckController (
    {
        deck,
        drawFromDeckHandler
    }
) {
    useEffect(() => {
        console.log('Something rerendered the DeckController.');
    });

    /**
     * Draws the top card from the deck.
     * @returns A card if any exist, null if empty.
     */
    function draw () {
        drawFromDeckHandler();
    }

    return <DeckView
        cards={deck.cards}
        drawFromDeckHandler={draw}
    />;
}

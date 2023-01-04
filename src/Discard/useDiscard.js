import { useEffect, useState } from 'react';

// Hook for a Discard and its methods
/**
 * A playing card discard pile object.
 * @class Discard
 * @property discardCards {array} the cards of the discard pile.
 */
export default function useDiscard () {
    const [discardCards, setDiscardCards] = useState([]);

    useEffect(() => {
        console.log(`Discard has ${discardCards.length} cards.`);
    });

    /**
     * Resets the discard.
     */
    function resetDiscard () {
        // const cardsClone = [...discardCards];
        // cardsClone.length = 0;
        // setDiscardCards(cardsClone);
        console.log(`Discard reset is not yet implemented.`);
        console.trace();
    };

    /**
     * Draws the top card from the discard.
     * @returns A card if any exist, null if empty.
     */
    function discardDraw () {
        console.log(`Drawing a card from the discard...`);
        const cardsClone = [...discardCards];

        if (cardsClone && cardsClone.length) {
            // Check the value of the top (last) card in the pile
            // Face cards (Jack, Queen, King) cannot be drawn.
            let topCard = cardsClone[cardsClone.length - 1];
            if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(topCard.value)) {
                topCard = cardsClone.pop();
                return {
                    discardCards: cardsClone,
                    cardDrawn: topCard
                }
            }
            else {
                console.log(`Cannot draw card ${topCard.name} of ${topCard.suit}.`);
                return {
                    discardCards: cardsClone,
                    cardDrawn: null
                }
            }
        }
        else {
            console.log(`No discard cards to draw from.`);
            return {
                discardCards: cardsClone,
                cardDrawn: null
            }
        }
    };

    return [
        discardCards, setDiscardCards, discardDraw, resetDiscard
    ];
}

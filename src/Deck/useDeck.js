import { useEffect, useState } from 'react';

// Hook for a Deck and its methods
/**
 * A playing card deck object.
 * @class Deck
 * @property cards {array} the cards of the deck
 */
export default function useDeck () {
    const [deckCards, setDeckCards] = useState([]);
    const [deckInitialized, setDeckInitialized] = useState(false);
    const [deckSuits, setDeckSuits] = useState([
        "clubs",
        "diamonds",
        "hearts",
        "spades"
    ]);
    const [maxCardsInSuit, setMaxCardsInSuit] = useState(13);

    useEffect(() => {
        console.log(`Deck has ${deckCards.length} cards.`);
    });

    function deckInit () {
        let cardsClone = [...deckCards];
        if (!deckInitialized) {
            console.log(`Initializing deck.`);
            cardsClone.length = 0;
            deckSuits.map(suit => {
                console.log(`Deck is ${cardsClone.length} cards.`);
                console.log(`Adding ${maxCardsInSuit} cards of ${suit}...`);
                cardsClone = cardsClone.concat(generateSuit(suit, maxCardsInSuit));
                console.log(`Deck is now ${cardsClone.length} cards.`);
            });
            cardsClone = deckShuffle(7, cardsClone);
            return {
                deckCards: cardsClone,
                deckInitialized: true
            };
        }
        else {
            console.log(`Deck already initialized.`);
            return {
                deckCards: cardsClone,
                deckInitialized: true
            }
        }
    }

    /**
     * Resets this deck to 52 cards, shuffled.
     */
    function deckReset () {
        let cardsClone = [...deckCards];
        const initResponse = deckInit();
        setDeckCards(initResponse.deckCards);
        setDeckInitialized(initResponse.deckInitialized);
    }

    /**
     * Draws the top card from the deck.
     * @returns {object} topCard A card if any exist, null if empty.
     */
    function deckDraw (deck = []) {
        console.log(`Drawing a card from the deck...`);
        let cardsClone = [];
        if (deck && deck.length) {
            cardsClone = deck;
        }
        else {
            cardsClone = [...deckCards];
        }
        
        if (cardsClone && cardsClone.length) {
            let topCard = cardsClone.shift();
            return {
                deckCards: cardsClone,
                cardDrawn: topCard
            };
        } else {
            console.log(`No cards left to draw from in the deck.`);
            return {
                deckCards: cardsClone,
                cardDrawn: null
            };
        }
    }

    /**
     * Shuffles this deck.
     * @param {number} times The number of times to shuffle the deck.
     * @param {array} deck An optional array of cards to shuffle.
     * @returns {array} cards The shuffled deck of cards.
     */
    function deckShuffle (times = 7, deck = []) {
        // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
        let cardsClone = [];
        let card = {}, i, rando;
        if (deck && deck.length) {
            cardsClone = deck;
        }
        else {
            cardsClone = [...deckCards];
        }
        
        console.log(`Shuffling the deck...`);
        for (let time = 1; time <= times; time++) {
            for (i = cardsClone.length - 1; i > 0; i--) {
                rando = Math.floor(Math.random() * (i + 1));
                card = {...cardsClone[i]};
                cardsClone[i] = {...cardsClone[rando]};
                cardsClone[rando] = card;
            }
            console.log(`Shuffled ${time} ${time === 1 ? 'time' : 'times'}.`);
        }
        console.log(`Done shuffling the deck.`);
        return cardsClone;
    }

    return [
        deckCards, setDeckCards, deckInitialized, setDeckInitialized, deckSuits, setDeckSuits, maxCardsInSuit, setMaxCardsInSuit, deckInit, deckReset, deckShuffle, deckDraw
    ];
}

function generateSuit (suit, maxCardsInSuit) {
    let newSuit = [];
    for (let i = 1; i <= maxCardsInSuit; i++) {
        let card = {
            value: i,
            suit: suit,
            name: '',
            faceUp: false,
            canBeStolen: true
        }
        if (i === 1) {
            card.name = 'Ace';
            card.canBeStolen = true;
        }
        else if (i === 11) {
            card.name = 'Jack';
            card.canBeStolen = false;
        }
        else if (i === 12) {
            card.name = 'Queen';
            card.canBeStolen = false;
        }
        else if (i === 13) {
            card.name = "King";
            card.canBeStolen = false;
        }
        else {
            card.name = String(i);
            card.canBeStolen = true;
        }
        newSuit.push(card);
    }
    
    return newSuit;
}

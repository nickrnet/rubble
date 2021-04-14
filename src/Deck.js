import Suit from './Suit.js';

/**
 * A playing card deck object.
 * @class Deck
 * @param {object} properties an object containing the properties to use for this deck.
 * @property cards {array} the cards of the deck
 */
 export default class Deck {
    constructor (properties) {
        try {
            let cards = [];

            if (properties && properties.cards && properties.cards.length > 0) {
                this.cards = properties.cards;
            }
            else {
                cards = [];
                this.cards = cards.concat(new Suit({name: "clubs"}).cards, new Suit({name: "diamonds"}).cards, new Suit({name: "hearts"}).cards, new Suit({name: "spades"}).cards);
            }
            
        } catch (err) {
            // console.error(err, properties);
            throw err;
        }
    }

    /**
     * Draws the top card from this deck.
     * @returns {Card}
     */
    draw = () => {
        if (this.cards) {
            return this.cards.shift();
        } else {
            console.error(`Tried to draw from deck when no cards available.`);
            console.trace();
        }
    }

    /**
     * Shuffles this deck.
     * @param {number} times The number of times to shuffle the deck.
     * @returns {array} cards The shuffled deck of cards.
     */
    shuffle = (times = 1) => {
        // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
        let card = {},
            i, rando;
        for (let time = 1; time <= times; time++) {
            for (i = this.cards.length - 1; i > 0; i--) {
                rando = Math.floor(Math.random() * (i + 1));
                card = this.cards[i];
                this.cards[i] = this.cards[rando];
                this.cards[rando] = card;
            }
        }
        return this.cards;
    }
}

Deck.prototype.toString = function () {
    return JSON.stringify(this);
}

Deck.prototype.cards = function () {
    return this.cards;
}

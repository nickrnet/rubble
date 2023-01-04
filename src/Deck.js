import Suit from './Suit.js';

/**
 * A playing card deck object.
 * @class Deck
 * @property cards {array} the cards of the deck
 */
 export default class Deck {
    cards = [];

    constructor () {
        this.init();
    }

    init () {
        this.cards = [].concat(new Suit("clubs").cards, new Suit("diamonds").cards, new Suit("hearts").cards, new Suit("spades").cards);
    }

    draw () {
        console.log("Drawing a card from the deck...");
        debugger;
        if (this.cards) {
            return this.cards.shift();
        } else {
            console.error(`Tried to draw from deck when no cards available.`);
            console.trace();
        }
    }

    reset () {
        this.init();
    }

    shuffle (times = 7) {
        // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
        console.log(`Shuffling the deck...`);
        let card = {}, i, rando;
        for (let time = 1; time <= times; time++) {
            for (i = this.cards.length - 1; i > 0; i--) {
                rando = Math.floor(Math.random() * (i + 1));
                card = this.cards[i];
                this.cards[i] = this.cards[rando];
                this.cards[rando] = card;
            }
            console.log(`Shuffled ${time} times.`);
        }
        console.log(`Done shuffling the deck.`);
    }
}

/**
 * Draws the top card from this deck.
 * @returns {Card}
 */
//  Deck.prototype.draw = function () {
//     console.log("Drawing a card from the deck...");
//     debugger;
//     if (this.cards) {
//         return this.cards.shift();
//     } else {
//         console.error(`Tried to draw from deck when no cards available.`);
//         console.trace();
//     }
// }

/**
 * Resets this deck to 52 cards, unshuffled.
 */
// Deck.prototype.reset = function () {
//     this.init();
// }

/**
 * Shuffles this deck.
 * @param {number} times The number of times to shuffle the deck.
 * @returns {array} cards The shuffled deck of cards.
 */
// Deck.prototype.shuffle = function (times = 7) {
//         // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
//         console.log(`Shuffling the deck...`);
//         let card = {}, i, rando;
//         for (let time = 1; time <= times; time++) {
//             for (i = this.cards.length - 1; i > 0; i--) {
//                 rando = Math.floor(Math.random() * (i + 1));
//                 card = this.cards[i];
//                 this.cards[i] = this.cards[rando];
//                 this.cards[rando] = card;
//             }
//         }
//         console.log(`Done shuffling the deck.`);
// }

// Deck.prototype.toString = function () {
//     return JSON.stringify(this);
// }

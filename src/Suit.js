import Card from './Card.js';

/**
 * A playing card suit.
 * @class Suit
 * @param {object} properties an object containing the properties to use for this suit.
 * @property name {string} the name of the suit,
 * @property cards {array} the cards of the suit.
 */
class Suit {
    constructor (name) {
        this.validSuits = [
            "clubs",
            "diamonds",
            "hearts",
            "spades"
        ];

        this.name = name || "";

        if (!this.name) {
            throw `Invalid name for suit specified: ${this.name}`;
        }
        if (!this.validSuits.includes(this.name)) {
            throw `Invalid suit specified: ${this.name}`;
        }
    
        if (!this.cards || this.cards.length !== 13) {
            this.cards = [];
            for (let i = 1; i <= 13; i++) {
                this.cards.push(new Card(this.name, i));
            }
        }
    }
}

Suit.prototype.toString = function () {
    return JSON.stringify(this);
}

export default Suit;

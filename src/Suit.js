import Card from './Card.js';

/**
 * A playing card suit.
 * @class Suit
 * @param {object} properties an object containing the properties to use for this suit.
 * @property name {string} the name of the suit,
 * @property cards {array} the cards of the suit.
 */
class Suit {
    constructor (properties) {
        this.validSuits = [
            "clubs",
            "diamonds",
            "hearts",
            "spades"
        ];

        try {
            if (!properties) {
                properties = {};
            }
            
            this.name = properties.name || "";

            if (!this.name) {
                throw `Invalid name for suit specified: ${this.name}`;
            }
            if (!this.validSuits.includes(this.name)) {
                throw `Invalid suit specified: ${this.name}`;
            }
        
            if (!this.cards || this.cards.length !== 13) {
                this.cards = [];
                for (let i = 1; i <= 13; i++) {
                    this.cards.push(new Card({suit: this.name, value: i}));
                }
                // this.cards = [{
                //      suit: 'clubs',
                //      name: 'Ace',
                //      value: 1
                //  }, {
                //      suit: 'clubs',
                //      name: '2',
                //      value: 2
                //  }, {
                //      suit: 'clubs',
                //      name: '3',
                //      value: 3
                //  },
                //      ...
                //  {
                //      suit: 'clubs',
                //      name: '10',
                //      value: 10
                //  }, {
                //      suit: 'clubs',
                //      name: 'Jack',
                //      value: 11
                //  }, {
                //      suit: 'clubs',
                //      name: 'Queen',
                //      value: 12
                //  }, {
                //      suit: 'clubs',
                //      name: 'King',
                //      value: 13
                // }]
            }
        } catch (err) {
            // console.error(err, properties);
            throw err;
        }
    }
}

Suit.prototype.toString = function () {
    return JSON.stringify(this);
}

export default Suit;

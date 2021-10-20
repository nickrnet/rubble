/**
 * A playing card discard pile object.
 * @class Discard
 * @param {object} properties an object containing the properties to use for this deck.
 * @property cards {array} the cards of the discard pile.
 */
 class Discard {
    cards = [];

    constructor () {   
        this.cards = [];
    }
}

/**
 * Draws the top card from this discard.
 * @returns {Card}
 */
 Discard.prototype.draw = function () {
    if (this.cards && this.cards.length) {
        if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(this.cards[this.cards.length - 1].value)) {
            return this.cards.pop();
        }
    }
}

/**
 * Places a Card on the top of this discard.
 * @param {card} card A card to place on top of the discard pile.
 */
 Discard.prototype.place = function (card) {
    this.cards.push({...card});
}

/**
 * Resets the discard.
 */
 Discard.prototype.reset = function () {
    this.cards = [];
}

Discard.prototype.toString = function () {
    return JSON.stringify(this);
}

export default Discard;

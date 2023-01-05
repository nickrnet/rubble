import Deck from './Deck.js';

/**
 * A player object.
 * @class Player
 * @param {object} properties an object containing the properties to use for this player.
 * @property name {string} the name of the player,
 * @property cards {array} the player's cards,
 * @property slots {number} the player's slots to flip,
 * @property card {card} the player's current card.
 */
 export default class Player {
    card = null;
    name = "";
    cards = [];
    slots = 10;
    isTurn = false;
    isAuto = false;

    constructor (properties) {
        try {
            // TODO: Improve this `properties` sanity check.
            if (!properties) {
                properties = {};
            }
            
            this.card = null;
            this.name = properties.name || "";
            this.cards = [];
            this.slots = properties.slots || 10;
            this.isTurn = properties.isTurn || false;
            this.isAuto = properties.isAuto || false;

            if (!this.name) {
                throw `Invalid name for player specified: ${this.name}`;
            }
            if (!this.slots) {
                this.slots = 10;
            }
        } catch (err) {
            throw err;
        }
    }
    
    /**
     * Draws a card from a deck and sets it as the Player's card.
     * @param {Deck} deck A Deck to draw from.
     */
    drawFromDeck (deck) {
        debugger;
        this.card = deck.draw();
    }
}

/**
 * Draws a card from a deck and sets it as the Player's card.
 * @param {Deck} deck A Deck to draw from.
 */
//  Player.prototype.drawFromDeck = function (deck) {
//     debugger;
//     this.card = deck.draw();
// }

/**
 * Draws a card from the discard pile and sets it as the Player's card.
 * @param {Discard} discard A discard pile.
 */
Player.prototype.drawFromDiscard = function (discard) {
    if (discard.cards.length > 0) {
        this.card = discard.draw();
    }
}

/**
 * Discards the player's current card.
 * @param discard {array} discard A discard pile.
 */
 Player.prototype.discardCard = function (discard) {
    if (this.card) {
        discard.place({...this.card});
        this.card = null;
        this.isTurn = false;
    }
}

/**
 * Resets this player's cards.
 */
Player.prototype.reset = function () {
    this.card = null;
    this.cards.length = 0;
}

Player.prototype.toString = function () {
    return JSON.stringify(this);
}

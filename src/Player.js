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
 * Places the player's card in the appropriate slot.
 * @param {Discard} discard A discard pile.
 */
 Player.prototype.placeCardInSlot = function (discard) {
    let swapped = false;
    if (this.card.value === 13) {
        // Kings are wild
        for (let c = 0; c < this.cards.length; c++) {
            // Swap Queens first
            if (this.cards[c].faceUp && this.cards[c].value == 12) {
                let slotCard = {...this.cards[c]};
                this.cards[c] = {...this.card};
                this.card = slotCard;
                swapped = true;
                break;
            }
        }
        if (!swapped) {
            for (let c = 0; c < this.cards.length; c++) {
                // Find the first face down card. This could be smarter or more aggressive.
                if (!this.cards[c].faceUp) {
                    let slotCard = {...this.cards[c]};
                    this.cards[c] = {...this.card};
                    this.card = slotCard;
                    this.card.faceUp = true;
                    swapped = true;
                    break;
                }
            }
        }
        if (!swapped) {
            this.discardCard(discard);
        }
    }
    else if (this.card.value <= this.cards.length) {
        // Put the card in its slot
        let slotCard = {...this.cards[this.card.value - 1]};
        if (slotCard.value === this.card.value && slotCard.faceUp) {
            return;
        }
        this.cards[this.card.value - 1] = this.card;
        this.card = slotCard;
        this.card.faceUp = true;
    }
    else {
        // Card cannot be played
        this.discardCard(discard);
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

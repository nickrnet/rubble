/**
 * A player object.
 * @class Player
 * @param {object} properties an object containing the properties to use for this player.
 * @property name {string} the name of the player,
 * @property cards {array} the player's cards,
 * @property slots {number} the player's slots to flip,
 * @property card {card} the player's current card.
 */
class Player {
    constructor(properties) {
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
     * @param {deck} deck A Deck to draw from.
     */
    drawFromDeck = (deck) => {
        this.card = deck.draw();
    }

    /**
     * Draws a card from the discard pile and sets it as the Player's card.
     * @param {discard} discard A discard pile.
     */
    drawFromDiscard = (discard) => {
        if (discard.cards.length > 0) {
            this.card = discard.draw();
        }
    }

    /**
     * Places the player's card in the appropriate slot.
     */
    placeCardInSlot = () => {
        // TODO: Handle Queens
        if (this.card.value === 13) {
            // Find the first face down card. This could be smarter or more aggressive.
            for (let c = 0; c < this.cards.length; c++) {
                if (!this.cards[c].faceUp) {
                    let slotCard = {...this.cards[c]};
                    this.cards[c] = {...this.card};
                    this.card = slotCard;
                    this.card.faceUp = true;
                    break;
                }
            }
        }
        else if (this.card.value <= this.cards.length) {
            let slotCard = {...this.cards[this.card.value - 1]};
            if (slotCard.value === this.card.value && slotCard.faceUp) {
                return;
            }
            this.cards[this.card.value - 1] = this.card;
            this.card = slotCard;
            this.card.faceUp = true;
        }
    }

    /**
     * Discards the player's current card.
     * @param discard {array} discard A discard pile.
     */
    discardCard = (discard) => {
        if (this.card) {
            discard.place(this.card);
            this.card = null;
        }
    }
}

Player.prototype.toString = function () {
    return JSON.stringify(this);
}

export default Player;

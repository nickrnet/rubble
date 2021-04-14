/**
 * @format
 */

import Deck from '../Deck';
import Discard from '../Discard';
import Player from '../Player';

describe('player tests', () => {
    describe('player properties', () => {
        it('should have a name', () => {
            let player = new Player({ name: 'Neo' });
            expect(player.name).toBe('Neo');
        });

        it('should ignore invalid name', () => {
            expect(() => {
                let player = new Player();
            }).toThrow();
        });

        it('should have slots', () => {
            let player = new Player({ name: 'Neo' });
            expect(player.slots).toBe(10);
        });

        it('should have cards', () => {
            let player = new Player({ name: 'Neo' });
            expect(player.cards.length).toBe(0);
        });
    });

    describe('player methods', () => {
        it('should draw a card from a deck', () => {
            let deck = new Deck();
            deck.shuffle(5);
            let player = new Player({ name: 'Neo' });
            player.drawFromDeck(deck);
            expect(player.card).toBeDefined();
            expect(player.card).not.toBe(null);
            expect(player.card.value).toBeGreaterThan(0);
            expect(player.card.value).toBeLessThanOrEqual(13);
        });

        it('should discard a card', () => {
            let deck = new Deck();
            let discard = new Discard();
            let player = new Player({ name: 'Neo' });
            player.drawFromDeck(deck);
            player.discardCard(discard);
            expect(player.card).toBe(null);
            expect(discard.cards[discard.cards.length]).not.toBe(null);
        });

        it('should draw from the discard', () => {
            let deck = new Deck();
            let discard = new Discard();
            let player1 = new Player({ name: 'Neo' });
            let player2 = new Player({ name: 'Cypher' });
            deck.shuffle();
            player1.drawFromDeck(deck);
            player1.discardCard(discard);
            expect(player1.card).toBe(null);
            expect(discard.cards[discard.cards.length]).not.toBe(null);
            player2.drawFromDiscard(discard);
            expect(player2.card).not.toBe(null);
            expect(discard.cards[discard.cards.length]).toBeUndefined();
        });

        it('should place a card in a slot', () => {
            let deck = new Deck();
            let discard = new Discard();
            let player = new Player({ name: 'Neo' });
            deck.shuffle();
            player.drawFromDeck(deck);
            player.placeCardInSlot();
            player.discardCard(discard);
        });
    });
});

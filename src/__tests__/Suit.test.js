/**
 * @format
 */

import Suit from '../Suit.js';

describe('suit tests', () => {
    it('should have a name', () => {
        let suit = new Suit({ name: 'hearts' });
        expect(suit.name).toBe('hearts');
    });

    it('should not allow invalid suit names', () => {
        expect(() => {
            let suit = new Suit({ name: 'squares' });
        }).toThrow();
    });

    it('should have cards', () => {
        let suit = new Suit({ name: 'diamonds' });
        expect(suit.cards.length).toBe(13);
        expect(suit.cards[0].suit).not.toBe('hearts');
    });
});

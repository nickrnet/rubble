/**
 * @format
 */

import Card from '../Card.js';

describe('card tests', () => {
  describe('card properties', () => {
    it('creates an ace', () => {
      let card = new Card({ value: 1 });
      expect(card.value).toBe(1);
      expect(card.name).toBe('Ace');
    });

    it('creates a 2', () => {
      let card = new Card({ value: 2 });
      expect(card.value).toBe(2);
      expect(card.name).toBe('2');
    });

    it('creates a 3', () => {
      let card = new Card({ value: 3 });
      expect(card.value).toBe(3);
      expect(card.name).toBe('3');
    });

    it('creates a 4', () => {
      let card = new Card({ value: 4 });
      expect(card.value).toBe(4);
      expect(card.name).toBe('4');
    });

    it('creates a 5', () => {
      let card = new Card({ value: 5 });
      expect(card.value).toBe(5);
      expect(card.name).toBe('5');
    });

    it('creates a 6', () => {
      let card = new Card({ value: 6 });
      expect(card.value).toBe(6);
      expect(card.name).toBe('6');
    });

    it('creates a 7', () => {
      let card = new Card({ value: 7 });
      expect(card.value).toBe(7);
      expect(card.name).toBe('7');
    });

    it('creates a 8', () => {
      let card = new Card({ value: 8 });
      expect(card.value).toBe(8);
      expect(card.name).toBe('8');
    });

    it('creates a 9', () => {
      let card = new Card({ value: 9 });
      expect(card.value).toBe(9);
      expect(card.name).toBe('9');
    });

    it('creates a 10', () => {
      let card = new Card({ value: 10 });
      expect(card.value).toBe(10);
      expect(card.name).toBe('10');
    });

    it('creates a jack', () => {
      let card = new Card({ value: 11 });
      expect(card.value).toBe(11);
      expect(card.name).toBe('Jack');
    });

    it('creates a queen', () => {
      let card = new Card({ value: 12 });
      expect(card.value).toBe(12);
      expect(card.name).toBe('Queen');
    });

    it('creates a king', () => {
      let card = new Card({ value: 13 });
      expect(card.value).toBe(13);
      expect(card.name).toBe('King');
    });
  
    it('ignores invalid values', () => {
      expect(() => {
        let card = new Card({ value: 99 });
      }).toThrow();
      expect(() => {
        let card = new Card();
      }).toThrow();
    });
  
    it('should have a name when specified', () => {
      let card = new Card({ name: '2', value: 2 });
      expect(card.name).toBe('2');
    });
  
    it('should have a name if not specified', () => {
      let card = new Card({ value: 1 });
      expect(card.name).toBe('Ace');
    });
  
    it('should have a suit', () => {
      let card = new Card({ suit: 'spades', value: 1 });
      expect(card.suit).toBe('spades');
    });
  });

  describe('card methods', () => {
    it('should flip', () => {
      let card = new Card({ value: 10 });
      card.flip();
      expect(card.faceUp).toBe(true);
    });
  });
});

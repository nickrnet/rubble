import React from 'react';

import BoardController from './Board/BoardController';

import Deck from './Deck';
import Discard from './Discard';
import Player from './Player';

const deck = new Deck();
const discard = new Discard();
const players = [
    new Player({ name: 'Neo', isTurn: true }),
    new Player({ name: 'Morpheus', slots: 8, isAuto: true }),
    new Player({ name: 'Trinity', slots: 5, isAuto: true }),
    new Player({ name: 'Cypher', slots: 2, isAuto: true })
];

deck.shuffle();

function deal() {
    let slotsFilled = false;
    let needToDeal = true;
    
    while (needToDeal) {
        for (let i = 0; i < players.length; i++) {
            let player = players[i];
            if (player.cards && player.cards.length < player.slots) {
                player.drawFromDeck(deck);
                player.cards.push({...player.card});
                player.card = null;
            }
        }
        
        slotsFilled = true;
        for (let i = 0; i < players.length; i++) {
            let player = players[i];
            if (player.cards.length < player.slots) {
                slotsFilled = false;
            }
        };
        needToDeal = !slotsFilled;
    }
}

export default function App() {
  deal();
  return (
    <BoardController deck={deck} discard={discard} players={players}/>
  );
}

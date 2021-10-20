import React, { useEffect, useState } from 'react';

import BoardController from '../Board/BoardController';
import Deck from '../Deck';
import Discard from '../Discard';
import Player from '../Player';

export default function GameController() {
    useEffect(() => {
        console.log('Something rerendered the GameController.');
    });

    const [deck, setDeck] = useState(new Deck());
    const [discard, setDiscard] = useState(new Discard());
    const [players, setPlayers] = useState([
        new Player({ name: 'Neo', isAuto: false, isTurn: true }),
        new Player({ name: 'Morpheus', isAuto: true }),
        new Player({ name: 'Trinity', isAuto: true }),
        new Player({ name: 'Cypher', isAuto: true })
    ]);

    const [gameInProgress, setGameInProgress] = useState(false);
    const [rounds, setRounds] = useState(0);
    const [roundOver, setRoundOver] = useState(false);
    const [roundWinner, setRoundWinner] = useState();
    const [gameOver, setGameOver] = useState(false);
    const [gameWinner, setGameWinner] = useState();
    
    function deal () {
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
    
    function newGameHandler (endGame) {
        if (!gameInProgress || endGame) {
            discard.reset();
            deck.reset();
            deck.shuffle();
            for (let i = 0; i < players.length; i++) {
                players[i].reset();
            }
            deal();
            setRounds(rounds + 1);
            setGameInProgress(true);
            setPlayers(players);
            setDeck(deck);
            setDiscard(discard);
            setRoundOver(false);
        }
    }

    function endRoundHandler () {
        // decrement the winner's slot count
        // get rid of the players' cards
        // newGame unless a player has no slots
    }

    newGameHandler();

    return (
        <BoardController
            deck={deck}
            setDeck={setDeck}
            discard={discard}
            setDiscard={setDiscard}
            players={players}
            setPlayers={setPlayers}
            rounds={rounds}
            setRounds={setRounds}
            roundOver={roundOver}
            setRoundOver={setRoundOver}
            roundWinner={roundWinner}
            setRoundWinner={setRoundWinner}
            gameOver={gameOver}
            setGameOver={setGameOver}
            gameWinner={gameWinner}
            setGameWinner={setGameWinner}
            endRoundHandler={endRoundHandler}
            newGameHandler={newGameHandler}
        />
    );
}

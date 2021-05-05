import React, { useEffect, useRef, useState } from 'react';

import BoardView from './BoardView';

export default function BoardController({ deck, discard, players }) {
    const [gameDeck, setGameDeck] = useState(deck);
    const [gameDiscard, setGameDiscard] = useState(discard);
    const [gamePlayers, setGamePlayers] = useState(players);
    const gameOver = useRef(false);
    const winner = useRef('');

    useEffect(() => {
        checkGameState();
    });

    function checkGameState() {
        let someoneWon = false;
        let gameWinner = "";
        for (let i = 0; i < gamePlayers.length; i++) {
            let faceUpCards = 0;
            let player = gamePlayers[i];
            for (let c = 0; c < player.cards.length; c++) {
                // Queens are not allowed to be shown and win
                if (player.cards[c].faceUp) {
                    if (player.cards[c].value != 12) {
                        faceUpCards = faceUpCards + 1;
                    }
                }
            }
            if (faceUpCards === player.slots) {
                someoneWon = true;
                gameWinner = player.name;
                // player.slots--;
                player.isTurn = false;
                break;
            }
        }
        
        if (someoneWon) {
            winner.current = gameWinner;
            gameOver.current = someoneWon;
        }

        if (gameDeck.cards.length === 0) {
            winner.current = "No one";
            gameOver.current = true;
        }

        if (!gameOver.current) {
            takeTurn();
        }
    }

    function getCurrentPlayer() {
        let foundPlayer = null;
        for (let i = 0; i < gamePlayers.length; i++) {
            let player = gamePlayers[i];
            if (player.isTurn) {
                foundPlayer = i;
            }
        }
        if (foundPlayer > gamePlayers.length) {
            foundPlayer = 0;
        }
        if (foundPlayer === null) {
            foundPlayer = 0;
        }

        return foundPlayer;
    }

    function discardCard(player) {
        let currentPlayer = getCurrentPlayer();
        player = gamePlayers[currentPlayer];
        player.discardCard(gameDiscard);
        player.isTurn = false;
        
        let nextPlayer = currentPlayer + 1;
        if (nextPlayer >= gamePlayers.length) {
            nextPlayer = 0;
        }
        gamePlayers[nextPlayer].isTurn = true;
        setGameDiscard({...gameDiscard});
        setGamePlayers([...gamePlayers]);
        checkGameState();
    }

    function drawFromDeck(player) {
        if (typeof player === 'undefined' || !player.name) {
            player = gamePlayers[getCurrentPlayer()];
        }
        if (!player.card && gameDeck.cards.length > 0) {
            player.drawFromDeck(gameDeck);
            player.card.faceUp = true;
            // TODO: Should we automatically place the card in the slot?
            setGameDeck({...gameDeck});
            setGamePlayers([...gamePlayers]);
        }
        else if (gameDeck.cards.length === 0) {
            setGameDeck({...deck});
            setGamePlayers([...gamePlayers]);
            winner.current = "No one";
            gameOver.current = true;
        }
    }
    
    function drawFromDiscard(player) {
        if (typeof player === 'undefined' || !player.name) {
            player = gamePlayers[getCurrentPlayer()];
        }

        if (!player.card) {
            let discardCard = discard.cards[discard.cards.length-1];
            let discardValue = discardCard.value;
            let hasKingInSlot = discardValue <= player.slots && player.cards[discardValue-1].value === 13 && player.cards[discardValue-1].faceUp;
            let canDrawDiscard = discardValue <= player.slots && !player.cards[discardValue-1].faceUp;
            if (hasKingInSlot || canDrawDiscard) {
                player.drawFromDiscard(gameDiscard);
                if (player.card) {
                    player.card.faceUp = true;
                }
                // TODO: Should we automatically place the card in the slot?
                setGameDiscard({...gameDiscard});
                setGamePlayers([...gamePlayers]);
            }
        }
    }

    function placeCardInSlot(player) {
        if (typeof player === 'undefined' || !player.name) {
            player = gamePlayers[getCurrentPlayer()];
        }
        if (player.card) {
            // Kings are wild
            if (player.card.value === 13) {
                player.placeCardInSlot();
            } else if (player.card.value === 12) {
                // Queens allow steals
                discardCard(player);
            } else if (player.card.value > 10) {
                discardCard(player);
            } else if (player.card.value > player.slots) {
                discardCard(player);
            } else if (player.cards[player.card.value - 1].value === player.card.value && player.cards[player.card.value - 1].faceUp) {
                discardCard(player);
            } else {
                player.placeCardInSlot();
            }
            setGamePlayers([...gamePlayers]);
            checkGameState();
        }
    }

    function stealCard(targetPlayer, slot) {
        let currentPlayer = gamePlayers[getCurrentPlayer()];
        if (currentPlayer.card && currentPlayer.card.value === 12) {
            console.log(`Trying to steal the ${slot} slot from ${targetPlayer.name}.`);
            let targetCard = targetPlayer.cards[slot];
            if (targetCard.faceUp && targetCard.canBeStolen) {
                let tempCard = {...targetCard};
                targetPlayer.cards[slot] = {...currentPlayer.card};
                currentPlayer.card = {...tempCard};
            }
        }
        setGamePlayers([...gamePlayers]);
    }

    function takeTurn() {
        let player = gamePlayers[getCurrentPlayer()];
        
        while (player && player.isTurn && player.isAuto) {
            if (player.card && player.card.value > 0) {
                placeCardInSlot(player);
            }
            else if (discard.cards.length > 0) {
                let discardCard = discard.cards[discard.cards.length-1];
                let discardValue = discardCard.value;
                if (discardValue <= player.slots && !player.cards[discardValue-1].faceUp) {
                    drawFromDiscard(player);
                    placeCardInSlot(player);
                }
                else if (gameDeck.cards.length > 0) {
                    drawFromDeck(player);
                    placeCardInSlot(player);
                }
                else {
                    player.isTurn = false;
                    setGamePlayers([...gamePlayers]);
                }
            }
            else {
                drawFromDeck(player);
                placeCardInSlot(player);
            }
        }
    }

    return <BoardView
        players={gamePlayers}
        deck={gameDeck}
        discard={gameDiscard}
        drawFromDeckHandler={drawFromDeck}
        drawFromDiscardHandler={drawFromDiscard}
        placeCardHandler={placeCardInSlot}
        stealCardHandler={stealCard}
        gameOver={gameOver.current}
        winner={winner.current} />;
}

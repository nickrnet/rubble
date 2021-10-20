import React, { useEffect } from 'react';

import BoardView from './BoardView';

export default function BoardController(
    {
        deck,
        setDeck,
        discard,
        setDiscard,
        players,
        setPlayers,
        newGameHandler,
        rounds,
        setRounds,
        roundOver,
        setRoundOver,
        roundWinner,
        setRoundWinner,
        gameOver,
        setGameOver,
        gameWinner,
        setGameWinner
    }
) {
    useEffect(() => {
        console.log('Something rerendered the BoardController.');
        checkGameState();
    });

    function checkGameState() {
        let someoneWon = false;
        let gameWinner = "";

        for (let i = 0; i < players.length; i++) {
            let faceUpCards = 0;
            let player = players[i];
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
                player.isTurn = false;
                player.slots--;
                break;
            }
        }
        
        if (someoneWon) {
            setRoundWinner(gameWinner);
            setRoundOver(true);
        }

        if (deck.cards.length === 0) {
            setRoundWinner('No one');
            setRoundOver(true);
        }

        if (!roundOver) {
            takeTurn();
        }
    }

    function getCurrentPlayer() {
        let foundPlayer = null;
        for (let i = 0; i < players.length; i++) {
            let player = players[i];
            if (player.isTurn) {
                foundPlayer = i;
            }
        }
        if (foundPlayer > players.length) {
            foundPlayer = 0;
        }
        if (foundPlayer === null) {
            foundPlayer = 0;
        }

        return foundPlayer;
    }

    function discardCard(player) {
        if (typeof player === 'undefined' || !player.name) {
            player = players[getCurrentPlayer()];
        }

        let currentPlayer = getCurrentPlayer();
        
        player.discardCard(discard);
        setDiscard(discard);
        
        let nextPlayer = currentPlayer + 1;
        if (nextPlayer >= players.length) {
            nextPlayer = 0;
        }
        players[nextPlayer].isTurn = true;
        setPlayers([...players]);
        // checkGameState();
    }

    function drawFromDeck(player) {
        if (typeof player === 'undefined' || !player.name) {
            player = players[getCurrentPlayer()];
        }
        if (!player.card && deck.cards.length > 0) {
            player.drawFromDeck(deck);
            player.card.faceUp = true;
        }
        else if (deck.cards.length === 0) {
            setGameWinner('No one');
            setGameOver(true);
        }

        setDeck(deck);
        setPlayers([...players]);
    }
    
    function drawFromDiscard(player) {
        if (typeof player === 'undefined' || !player.name) {
            player = players[getCurrentPlayer()];
        }

        if (!player.card) {
            let discardCard = discard.cards[discard.cards.length-1];
            let discardValue = discardCard.value;
            let hasKingInSlot = discardValue <= player.slots && player.cards[discardValue-1].value === 13 && player.cards[discardValue-1].faceUp;
            let hasQueenInSlot = discardValue <= player.slots && player.cards[discardValue-1].value === 12 && player.cards[discardValue-1].faceUp;
            let canDrawDiscard = discardValue <= player.slots && !player.cards[discardValue-1].faceUp;
            if (hasKingInSlot || hasQueenInSlot || canDrawDiscard) {
                player.drawFromDiscard(discard);
                if (player.card) {
                    player.card.faceUp = true;
                }
                // TODO: Should we automatically place the card in the slot?
                setDiscard(discard);
                setPlayers([...players]);
            }
        }
    }

    function placeCardInSlot(player) {
        if (typeof player === 'undefined' || !player.name) {
            player = players[getCurrentPlayer()];
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
            setPlayers([...players]);
            // checkGameState();
        }
    }

    function stealCard(targetPlayer, slot) {
        let stoleACard = false;
        let currentPlayer = players[getCurrentPlayer()];
        if (targetPlayer.name === currentPlayer.name) {}
        if (currentPlayer.card && currentPlayer.card.value === 12) {
            let targetCard = targetPlayer.cards[slot];
            if (targetCard && targetCard.faceUp && targetCard.canBeStolen) {
                let tempCard = {...targetCard};
                targetPlayer.cards[slot] = {...currentPlayer.card};
                currentPlayer.card = {...tempCard};
                stoleACard = true;
            }
        }
        setPlayers([...players]);
        return stoleACard;
    }

    function takeTurn() {
        let player = players[getCurrentPlayer()];
        
        while (player && player.isTurn && player.isAuto) {
            if (player.card && player.card.value == 12) {
                // Player can steal from another
                let slot, stoleACard;
                for (let c = 0; c < player.cards.length; c++) {
                    // Find first slot facedown
                    if (!player.cards[c].faceUp) {
                        slot = c;
                    }
                    // Find a King
                    else if (player.cards[c].value == 13) {
                        slot = c;
                    }
                    if (slot) {
                        for (let p = 0; p < players.length; p++) {
                            stoleACard = stealCard(players[p], slot);
                            if (stoleACard) {
                                break;
                            }
                        }
                        if (stoleACard) {
                            break;
                        }
                    }
                }
                placeCardInSlot(player);
            }
            else if (player.card && player.card.value > 0) {
                placeCardInSlot(player);
            }
            else if (discard.cards.length > 0) {
                let discardCard = discard.cards[discard.cards.length-1];
                let discardValue = discardCard.value;
                let hasQueen = false;
                let queenSlot;
                // Check for a Queen
                for (let c = 0; c < player.cards.length; c++) {
                    if (player.cards[c].faceUp && player.cards[c].value == 12) {
                        hasQueen = true;
                        queenSlot = c;
                        break;
                    }
                }
                if (hasQueen && queenSlot && discardValue < 11 && player.cards[queenSlot].value === discardValue) {
                    drawFromDiscard(player);
                    placeCardInSlot(player);
                }
                else if (discardValue <= player.slots && !player.cards[discardValue-1].faceUp) {
                    drawFromDiscard(player);
                    placeCardInSlot(player);
                }
                else if (deck.cards.length > 0) {
                    drawFromDeck(player);
                    placeCardInSlot(player);
                }
                else {
                    player.isTurn = false;
                    setPlayers([...players]);
                }
            }
            else {
                drawFromDeck(player);
                placeCardInSlot(player);
            }
        }
    }

    return <BoardView
        players={players}
        setPlayers={setPlayers}
        deck={deck}
        setDeck={setDeck}
        discard={discard}
        setDiscard={setDiscard}
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
        drawFromDeckHandler={drawFromDeck}
        drawFromDiscardHandler={drawFromDiscard}
        placeCardHandler={placeCardInSlot}
        stealCardHandler={stealCard}
        newGameHandler={newGameHandler}
    />;
}

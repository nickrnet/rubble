import React, { useEffect, useState } from 'react';

import BoardView from './BoardView';

export default function BoardController(
    {
        deckInitialized,
        setDeckInitialized,
        deckCards,
        setDeckCards,
        deckDraw,
        discardCards,
        setDiscardCards,
        discardDraw,
        discardReset,
        playersList,
        setPlayersList,
        playersReset,
        playersInitialized,
        round,
        setRound,
        activePlayerIndex,
        setActivePlayerIndex
    }
) {
    const [resetDiscard, setResetDiscard] = useState(false);
    const [resetPlayers, setResetPlayers] = useState(false);
    const [roundOver, setRoundOver] = useState(false);
    const [roundWinner, setRoundWinner] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [gameWinner, setGameWinner] = useState(null);

    const [autoPlayerShouldDrawFromDiscard, setAutoPlayerShouldDrawFromDiscard] = useState(false);
    const [autoPlayerShouldDrawFromDeck, setAutoPlayerShouldDrawFromDeck] = useState(false);
    const [autoPlayerDrew, setAutoPlayerDrew] = useState(false);
    const [autoPlayerCheckCard, setAutoPlayerCheckCard] = useState(false);
    const [autoPlayerPlayCard, setAutoPlayerPlayCard] = useState(false);
    const [autoPlayerDiscardCard, setAutoPlayerDiscardCard] = useState(false);

    useEffect(() => {
        if (deckInitialized && playersInitialized) {
            initBoard();
        }
    }, [deckInitialized, playersInitialized]);

    useEffect(() => {
        if (resetDiscard) {
            const discard = discardReset();
            setDiscardCards(discard.discardCards);
            setResetDiscard(false);
        }
    }, [resetDiscard]);

    useEffect(() => {
        if (resetPlayers) {
            const players = playersReset();
            setPlayersList(players.playersList);
            setResetPlayers(false);
        }
    }, [resetPlayers]);

    useEffect(() => {
        const player = playersList[activePlayerIndex];
        if (player && player.isAuto) {
            console.log(`Found auto player ${player.playerName}.`);
            playAutoTurn();
        }
    }, [activePlayerIndex]);

    useEffect(() => {
        const player = playersList[activePlayerIndex];
        if (player) {
            if (autoPlayerShouldDrawFromDiscard) {
                console.log(`Auto player ${player.playerName} is drawing from discard.`);
                playerDrawFromDiscard();
                setAutoPlayerShouldDrawFromDiscard(false);
                setAutoPlayerDrew(true);
            }
        }
    }, [autoPlayerShouldDrawFromDiscard]);
    
    useEffect(() => {
        const player = playersList[activePlayerIndex];
        if (player) {
            if (autoPlayerShouldDrawFromDeck) {
                console.log(`Auto player ${player.playerName} is drawing from the deck.`);
                playerDrawFromDeck();
                setAutoPlayerShouldDrawFromDeck(false);
                setAutoPlayerDrew(true);
            }
        }
    }, [autoPlayerShouldDrawFromDeck]);

    useEffect(() => {
        const player = playersList[activePlayerIndex];
        if (player) {
            if (autoPlayerDrew) {
                console.log(`Auto player ${player.playerName} has drawn.`);
                setAutoPlayerDrew(false);
                setAutoPlayerCheckCard(true);
            }
        }
    }, [autoPlayerDrew]);

    useEffect(() => {
        const player = playersList[activePlayerIndex];
        if (player) {
            if (autoPlayerCheckCard) {
                console.log(`Auto player ${player.playerName} is checking their card.`);
                const cardValue = player.card.value;
                if (cardValue < player.slots) {
                    if (!player.cards[cardValue-1].faceUp) {
                        setAutoPlayerPlayCard(true);
                    }
                    else {
                        setAutoPlayerDiscardCard(true);
                    }
                }
                else {
                    setAutoPlayerDiscardCard(true);
                }
                setAutoPlayerCheckCard(false);
            }
        }
    }, [autoPlayerCheckCard]);
    
    useEffect(() => {
        const player = playersList[activePlayerIndex];
        if (player) {
            if (autoPlayerPlayCard) {
                console.log(`Auto player ${player.playerName} is playing their card.`);
                playerPlaceCard(player.card.value-1);
                setAutoPlayerPlayCard(false);
                setAutoPlayerDrew(true);
            }
        }
    }, [autoPlayerPlayCard]);
    
    useEffect(() => {
        const player = playersList[activePlayerIndex];
        if (player) {
            if (autoPlayerDiscardCard) {
                console.log(`Auto player ${player.playerName} is discarding their card.`);
                playerDiscard();
                setAutoPlayerDiscardCard(false);
            }
        }
    }, [autoPlayerDiscardCard]);

    function initBoard () {
        console.log(`Dealing cards to players.`);
        dealPlayers();
    }

    function dealPlayers () {
        let deckCardsClone = [...deckCards];
        let needToDeal = true;
        let dealtPlayers = [...playersList];
        while (needToDeal) {
            dealtPlayers.forEach((player) => {
                if (player.cards.length < player.slots) {
                    const drawnCard = deckDraw(deckCardsClone);
                    player.cards.push(drawnCard.cardDrawn);
                    deckCardsClone = drawnCard.deckCards;
                }
            });
            if (needToDeal) {
                let fullSlots = 0;
                dealtPlayers.forEach(player => {
                    if (player.cards.length == player.slots) {
                        fullSlots++;
                    }
                });
                if (fullSlots == dealtPlayers.length) {
                    needToDeal = false;
                }
            }
        }
        setDeckCards(deckCardsClone);
        setPlayersList(dealtPlayers);
    }

    function playerDrawFromDeck () {
        const playersListClone = [...playersList];
        const player = {...playersListClone[activePlayerIndex]};
        const deckCardsClone = [...deckCards];
        if (!player.card) {
            if (deckCardsClone && deckCardsClone.length) {
                const draw = deckDraw();
                player.card = {...draw.cardDrawn};
                player.card.faceUp = true;
                playersListClone[activePlayerIndex] = {...player};
                setPlayersList(playersListClone);
                setDeckCards([...draw.deckCards]);
            }
            else {
                console.log(`No cards to draw from.`);
            }
        }
        else {
            console.log(`Player already has a card.`);
        }
    }

    function playerDrawFromDiscard () {
        const playersListClone = [...playersList];
        const player = {...playersListClone[activePlayerIndex]};
        const discardCardsClone = [...discardCards];
        if (!player.card) {
            if (discardCardsClone && discardCardsClone.length) {
                const draw = discardDraw();
                player.card = {...draw.cardDrawn};
                player.card.faceUp = true;
                playersListClone[activePlayerIndex] = {...player};
                setPlayersList(playersListClone);
                setDiscardCards([...draw.discardCards]);
            }
            else {
                console.log(`No discard cards to draw from.`);
            }
        }
        else {
            console.log(`Player already has a card.`);
        }
    }

    function playerDiscard () {
        const playersListClone = [...playersList];
        const player = {...playersListClone[activePlayerIndex]};
        const discardCardsClone = [...discardCards];
        if (player.card) {
            discardCardsClone.push({...player.card});
            player.card = null;
            playersListClone[activePlayerIndex] = {...player};
            setPlayersList(playersListClone);
            setDiscardCards(discardCardsClone);
            endTurn();
        }
    }

    function playerPlaceCard (targetSlot = 0) {
        const playersListClone = [...playersList];
        const player = {...playersListClone[activePlayerIndex]};
        if (player.card && player.card.value) {
            // Jacks are discarded
            if (player.card.value == 11) {
                playerDiscard();
            }
            // TODO: Handle Queen (steal)
            else if (player.card.value == 12) {
                playerDiscard();
            }
            else {
                // Put the card in the requested slot
                // Kings are wild and can go in any slot
                if (player.card.value-1 == targetSlot || player.card.value == 13) {
                    let slotCard = {...player.cards[targetSlot]};
                    slotCard.faceUp = true;
                    player.cards[targetSlot] = {...player.card};
                    player.card = slotCard;
                    playersListClone[activePlayerIndex] = {...player};
                    setPlayersList(playersListClone);
                }
            }
        }
    }

    function endRound () {
        // TODO: Check for game over and reset
        const playersListClone = [...playersList];

        const currentPlayer = playersListClone[activePlayerIndex];
        const currentPlayerCards = currentPlayer.cards;
        let currentPlayerFaceUpCards = 0;
        for (let i = 0; i < currentPlayerCards.length; i++) {
            if (currentPlayerCards[i].faceUp) {
                currentPlayerFaceUpCards++;
            }
        }
        if (currentPlayerFaceUpCards === currentPlayer.slots) {
            playersListClone[activePlayerIndex].slots = playersListClone[activePlayerIndex].slots-1;
        }

        setPlayersList(playersListClone);
        setRound(round+1);
        setResetPlayers(true);
        setDeckInitialized(false);
        setResetDiscard(true);
        setRoundOver(false);
        if (activePlayerIndex < playersListClone.length-1) {
            setActivePlayerIndex(activePlayerIndex+1);
        }
        else {
            setActivePlayerIndex(0);
        }
    }

    function endTurn () {
        // TODO check for auto players
        const currentPlayer = playersList[activePlayerIndex];
        const currentPlayerCards = currentPlayer.cards;
        let currentPlayerFaceUpCards = 0;
        let currentPlayerWon = false;
        for (let i = 0; i < currentPlayerCards.length; i++) {
            if (currentPlayerCards[i] && currentPlayerCards[i].faceUp) {
                currentPlayerFaceUpCards++;
            }
        }
        if (currentPlayer.slots === currentPlayerFaceUpCards) {
            // Someone won. New round.
            const currentPlayer = playersList[activePlayerIndex];
            // Check game over man
            if (currentPlayer.slots === 1) {
                console.log(`${currentPlayer.playerName} won the whole game!`);
                currentPlayerWon = true;
                setGameWinner(currentPlayer.playerName);
                setRoundOver(true);
                setGameOver(true);
            }
            if (!currentPlayerWon) {
                console.log(`${currentPlayer.playerName} won the round!`);
                setRoundOver(true);
                setRoundWinner(currentPlayer.playerName);
            }
        }
        else if (!deckCards.length) {
            // Deck is empty, new round
            console.log('Deck empty. New round.');
            setRoundOver(true);
        }
        // Next player's turn
        else if (activePlayerIndex < playersList.length-1) {
            setActivePlayerIndex(activePlayerIndex+1);
        }
        else {
            setActivePlayerIndex(0);
        }
    }

    function playAutoTurn () {
        const player = playersList[activePlayerIndex];
        // Check discard
        if (discardCards.length) {
            // Draw if needed
            const lastDiscardedCard = discardCards[discardCards.length-1];
            const lastDiscardedCardValue = lastDiscardedCard.value;
            if (lastDiscardedCardValue < 10 && 
                player.slots >= lastDiscardedCardValue && 
                player.cards[lastDiscardedCardValue-1] &&
                !player.cards[lastDiscardedCardValue-1].faceUp) {
                console.log('Auto player should draw from discard.');
                setAutoPlayerShouldDrawFromDiscard(true);
            }
            else {
                console.log('Auto player cannot draw the discard.');
                setAutoPlayerShouldDrawFromDeck(true);
            }
        }
        // Draw
        else if (deckCards.length) {
            console.log('Auto player should draw card from the deck.');
            setAutoPlayerShouldDrawFromDeck(true);
        }
    }

    return <BoardView
        playersList={playersList}
        deckCards={deckCards}
        discardCards={discardCards}
        round={round}
        activePlayerIndex={activePlayerIndex}
        playerDrawFromDeck={playerDrawFromDeck}
        playerDiscard={playerDiscard}
        playerDrawFromDiscard={playerDrawFromDiscard}
        playerPlaceCard={playerPlaceCard}
        endRound={endRound}
        roundOver={roundOver}
        setRoundOver={setRoundOver}
        roundWinner={roundWinner}
        gameOver={gameOver}
        gameWinner={gameWinner}
    />;
}

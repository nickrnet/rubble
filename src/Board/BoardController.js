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

    const [dealing, setDealing] = useState(false);
    const [playerNeedsDealt, setPlayerNeedsDealt] = useState(false);
    const [playerDealtACard, setPlayerDealtACard] = useState(false);
    const [checkPlayerSlots, setCheckPlayerSlots] = useState(false);

    const [autoPlayerShouldDrawFromDiscard, setAutoPlayerShouldDrawFromDiscard] = useState(false);
    const [autoPlayerShouldDrawFromDeck, setAutoPlayerShouldDrawFromDeck] = useState(false);
    const [autoPlayerDrew, setAutoPlayerDrew] = useState(false);
    const [autoPlayerCheckCard, setAutoPlayerCheckCard] = useState(false);
    const [autoPlayerPlayCard, setAutoPlayerPlayCard] = useState(false);
    const [autoPlayerDiscardCard, setAutoPlayerDiscardCard] = useState(false);

    const [viewHelp, setViewHelp] = useState(true);

    const logAutoPlayerMoves = true;

    useEffect(() => {
        if (deckInitialized && playersInitialized) {
            console.log(`Dealing cards to players.`);
            setDealing(true);
            dealPlayers();
        }
    }, [deckInitialized, playersInitialized]);

    useEffect(() => {
        console.log('Starting checkPlayerSlots');
        if (checkPlayerSlots) {
            console.log('checkPlayerSlots TRUE');
            const currentPlayer = playersList[activePlayerIndex];
            if (currentPlayer.cards.length <= currentPlayer.slots) {
                setCheckPlayerSlots(false);
                setPlayerNeedsDealt(true);
            }
        }
        else {
            // Check all players for slots that need a card
            let needsDealt = false;
            for (let i = 0; i < playersList.length; i++){
                if (playersList[i].cards.length < playersList[i].slots) {
                    needsDealt = true;
                }
            }
            if (needsDealt) {
                // Trigger another walk through the players
                setPlayerDealtACard(true);
            }
            else {
                // Start the round
                setDealing(false);
            }
        }
    }, [checkPlayerSlots]);

    useEffect(() => {
        if (!dealing) {
            const currentPlayer = playersList[activePlayerIndex];
            if (currentPlayer && currentPlayer.isAuto) {
                playAutoTurn();
            }
        }
    }, [dealing]);

    useEffect(() => {
        if (playerNeedsDealt) {
            setPlayerNeedsDealt(false);
            dealPlayerACard();
        }
    }, [playerNeedsDealt]);

    useEffect(() => {
        if (playerDealtACard) {
            setPlayerDealtACard(false);
            if (activePlayerIndex < playersList.length-1) {
                setActivePlayerIndex(activePlayerIndex+1);
            }
            else {
                setActivePlayerIndex(0);
            }
            setCheckPlayerSlots(true);
        }
    }, [playerDealtACard]);

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
            dealPlayers();
        }
    }, [resetPlayers]);

    useEffect(() => {
        const player = playersList[activePlayerIndex];
        if (player && player.isAuto) {
            if (logAutoPlayerMoves) {
                console.log(`Found auto player ${player.playerName}.`);
            }
            playAutoTurn();
        }
    }, [activePlayerIndex]);

    useEffect(() => {
        const player = playersList[activePlayerIndex];
        if (player) {
            if (autoPlayerShouldDrawFromDiscard) {
                if (logAutoPlayerMoves) {
                    console.log(`Auto player ${player.playerName} is drawing from discard.`);
                }
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
                if (logAutoPlayerMoves) {
                    console.log(`Auto player ${player.playerName} is drawing from the deck.`);
                }
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
                if (logAutoPlayerMoves) {
                    console.log(`Auto player ${player.playerName} has drawn.`);
                }
                setAutoPlayerDrew(false);
                setAutoPlayerCheckCard(true);
            }
        }
    }, [autoPlayerDrew]);

    useEffect(() => {
        if (autoPlayerCheckCard) {
            const player = playersList[activePlayerIndex];
            if (player) {
                if (logAutoPlayerMoves && player.card) {
                    console.log(`Auto player ${player.playerName} is checking their card, a ${player.card.name} of ${player.card.suit}.`);
                }
                const playerCard = player.card;
                if (playerCard) {
                    setAutoPlayerCheckCard(false);
                    const playerCardValue = playerCard.value;
                    const slotCard = player.cards[playerCardValue-1];
                    if (playerCardValue <= player.slots) {
                        if (slotCard && !slotCard.faceUp) {
                            if (logAutoPlayerMoves) {
                                console.log(`Auto player ${player.playerName} should play their card.`);
                            }
                            setAutoPlayerPlayCard(true);
                        }
                        else {
                            if (logAutoPlayerMoves) {
                                console.log(`Auto player ${player.playerName} should discard their card.`);
                            }
                            setAutoPlayerDiscardCard(true);
                        }
                    }
                    else {
                        if (logAutoPlayerMoves) {
                            console.log(`Auto player ${player.playerName} cannot hold a ${player.card.name} and should discard their card.`);
                        }
                        setAutoPlayerDiscardCard(true);
                    }
                }
            }
        }
    }, [autoPlayerCheckCard]);
    
    useEffect(() => {
        const player = playersList[activePlayerIndex];
        if (player && player.card) {
            if (autoPlayerPlayCard) {
                if (logAutoPlayerMoves && player.card) {
                    console.log(`Auto player ${player.playerName} is playing their ${player.card.name} of ${player.card.suit} card.`);
                }
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
                if (logAutoPlayerMoves && player.card) {
                    console.log(`Auto player ${player.playerName} is discarding their ${player.card.name} of ${player.card.suit} card.`);
                }
                playerDiscard();
                setAutoPlayerDiscardCard(false);
            }
        }
    }, [autoPlayerDiscardCard]);

    function dealPlayers () {
        setDealing(true);
        setCheckPlayerSlots(true);
    }

    function dealPlayerACard () {
        console.log(`DEALING: ${dealing}`);
        if (deckCards && deckCards.length) {
            const playersListClone = [...playersList];
            const player = {...playersListClone[activePlayerIndex]};
            if (player.cards.length < player.slots) {
                const draw = deckDraw();
                player.cards.push({...draw.cardDrawn});
                playersListClone[activePlayerIndex] = {...player};
                console.log(`Dealt a ${draw.cardDrawn.name} of ${draw.cardDrawn.suit} to ${player.playerName} in slot ${player.cards.length}.`);
                setPlayersList(playersListClone);
                setDeckCards(draw.deckCards);
                setCheckPlayerSlots(false);
                setPlayerDealtACard(true);
            }
        }
    }

    function playerDrawFromDeck () {
        const deckCardsClone = [...deckCards];
        const playersListClone = [...playersList];
        const player = {...playersListClone[activePlayerIndex]};
        if (!player.card) {
            if (deckCardsClone && deckCardsClone.length) {
                const draw = deckDraw();
                player.card = {...draw.cardDrawn};
                player.card.faceUp = true;
                playersListClone[activePlayerIndex] = {...player};
                setPlayersList(playersListClone);
                setDeckCards(draw.deckCards);
            }
            else {
                console.log(`No cards to draw from.`);
            }
            setDealing(false);
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
                const topDiscard = discardCardsClone[discardCardsClone.length-1];
                if (topDiscard.value <= 10) {
                    const draw = discardDraw();
                    player.card = {...draw.cardDrawn};
                    player.card.faceUp = true;
                    playersListClone[activePlayerIndex] = {...player};
                    setPlayersList(playersListClone);
                    setDiscardCards(draw.discardCards);
                }
                else {
                    console.log(`Cannot draw ${topDiscard.name}.`);
                }
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
        setDealing(true);
    }

    function endTurn () {
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
            setRoundWinner('No one');
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
        if (!dealing) {
            const player = playersList[activePlayerIndex];
            // Check discard
            if (player && player.isAuto && discardCards.length) {
                // Draw if needed
                const lastDiscardedCard = discardCards[discardCards.length-1];
                const lastDiscardedCardValue = lastDiscardedCard.value;
                if (lastDiscardedCardValue <= 10 && 
                    player.slots >= lastDiscardedCardValue && 
                    player.cards[lastDiscardedCardValue-1] &&
                    !player.cards[lastDiscardedCardValue-1].faceUp) {
                        if (logAutoPlayerMoves) {
                            console.log('Auto player should draw from discard.');
                        }
                        setAutoPlayerShouldDrawFromDiscard(true);
                }
                else {
                    if (logAutoPlayerMoves) {
                        console.log('Auto player cannot draw the discard.');
                    }
                    setAutoPlayerShouldDrawFromDeck(true);
                }
            }
            // Draw
            else if (deckCards.length) {
                if (logAutoPlayerMoves) {
                    console.log('Auto player should draw card from the deck.');
                }
                setAutoPlayerShouldDrawFromDeck(true);
            }
        }
        else {
            console.log('Currently dealing, nothing to do.');
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
        dealing={dealing}
        endRound={endRound}
        roundOver={roundOver}
        setRoundOver={setRoundOver}
        roundWinner={roundWinner}
        gameOver={gameOver}
        gameWinner={gameWinner}
        viewHelp={viewHelp}
        setViewHelp={setViewHelp}
    />;
}

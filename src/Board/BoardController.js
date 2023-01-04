import React, { useEffect, useState } from 'react';

import BoardView from './BoardView';

export default function BoardController(
    {
        deckCards,
        setDeckCards,
        deckDraw,
        discardCards,
        setDiscardCards,
        discardDraw,
        playersList,
        setPlayersList,
        playersInitialized,
        round,
        setRound,
        activePlayerIndex,
        setActivePlayerIndex
    }
) {
    const [playersDealt, setPlayersDealt] = useState(false);
    const [roundWinner, setRoundWinner] = useState(null);

    useEffect(() => {
        console.log(`Rendering BoardController.`);
    });

    useEffect(() => {
        initBoard();
    }, [playersInitialized]);

    function initBoard () {
        if (playersInitialized) {
            console.log(`Dealing cards to players.`);
            dealPlayers();
        }
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
        setPlayersDealt(true);
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

    function endTurn () {
        // TODO check deck, discard+next player's slots for autos, start new round/game
        if (activePlayerIndex < playersList.length-1) {
            setActivePlayerIndex(activePlayerIndex+1);
        }
        else {
            setActivePlayerIndex(0);
        }
    }

    function playerPlaceCard (targetSlot = 0) {
        console.log(`BoardController.playerPlaceCard`);
        const playersListClone = [...playersList];
        const player = {...playersListClone[activePlayerIndex]};
        if (player.card && player.card.value) {
            // Jacks are discarded
            if (player.card.value == 11) {
                playerDiscard();
                return;
            }
            // TODO: Handle Queen (steal)
            else if (player.card.value == 12) {
                playerDiscard();
                return;
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

    function newRound () {
        setRound(round+1);
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
    />;
}

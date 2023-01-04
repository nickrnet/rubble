import { v4 as uuidv4 } from 'uuid';

import { useEffect, useState } from 'react';

import BoardController from '../Board/BoardController';
import useDeck from '../Deck/useDeck';
import DeckView from '../Deck/DeckView';
import useDiscard from '../Discard/useDiscard';
import DiscardView from '../Discard/DiscardView';
import IndividualPlayerView from '../Player/IndividualPlayerView';
import usePlayers from '../Player/usePlayers';

export default function GameController() {
    const [
        discardCards, setDiscardCards,
        discardDraw, discardReset
    ] = useDiscard();
    const [
        deckCards, setDeckCards,
        deckInitialized, setDeckInitialized,
        deckSuits, setDeckSuits,
        maxCardsInSuit, setMaxCardsInSuit,
        deckInit, deckReset, deckShuffle, deckDraw
    ] = useDeck();
    const [
        playersList, setPlayersList,
        maxPlayers, setMaxPlayers,
        activePlayerIndex, setActivePlayerIndex,
        playersInitialized, setPlayersInitialized,
        playersInit, playersReset, getCurrentPlayer
    ] = usePlayers();
    const [round, setRound] = useState(0);

    useEffect(() => {
        initializeGame();
    }, [deckInitialized, playersInitialized]);

    function initializeGame () {
        if (!deckInitialized) {
            const newDeck = deckInit();
            setDeckInitialized(newDeck.deckInitialized);
            setDeckCards(newDeck.deckCards);
        }
        if (!playersInitialized) {
            const newPlayersList = playersInit();
            setPlayersInitialized(newPlayersList.playersInitialized);
            setPlayersList(newPlayersList.playersList);
            setActivePlayerIndex(newPlayersList.activePlayerIndex);
            setRound(1);
        }
        console.log(`Active player: ${playersList && playersList.length ? playersList[activePlayerIndex].playerName : 'unknown'}`);
    }

    return (
        <div>
            <BoardController 
                deckCards={deckCards}
                setDeckCards={setDeckCards}
                deckDraw={deckDraw}
                discardCards={discardCards}
                setDiscardCards={setDiscardCards}
                discardDraw={discardDraw}
                playersList={playersList}
                setPlayersList={setPlayersList}
                playersInitialized={playersInitialized}
                round={round}
                setRound={setRound}
                activePlayerIndex={activePlayerIndex}
                setActivePlayerIndex={setActivePlayerIndex} />
        </div>
    );
}

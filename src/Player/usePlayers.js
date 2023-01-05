import { v4 as uuidv4 } from 'uuid';

import { useEffect, useState } from 'react';

// Hook for Players and their methods
/**
 * A list of Players and its methods.
 * @class Players
 * @param deck {Deck} The deck of the game.
 * @param discardPile {Discard} The discard pile of the game.
 */
export default function usePlayers () {
    const [playersList, setPlayersList] = useState([]);
    const [maxPlayers, setMaxPlayers] = useState(4);
    const [activePlayerIndex, setActivePlayerIndex] = useState(0);
    const [playersInitialized, setPlayersInitialized] = useState(false);

    useEffect(() => {
        console.log(`Players loaded with ${playersList.length} players.`);
    });

    function playersInit () {
        let playersClone = [...playersList];
        if (!playersInitialized) {
            playersClone.length = 0;
            playersClone = [...Array(maxPlayers)].map((item, index) => {
                console.log(`Creating player ${index + 1}...`);
                return new Player(`Player ${index + 1}`);
            });
            playersClone[0].isAuto = false;
            return {
                playersInitialized: true,
                playersList: playersClone,
                activePlayerIndex: 0
            };
        }
        else {
            console.log(`Players already initialized.`);
            return {
                playersInitialized, playersInitialized,
                playersList: playersList,
                activePlayerIndex: activePlayerIndex
            }
        }
    }

    /**
     * Resets the Players.
     */
    function playersReset () {
        let playersClone = [...playersList];
        for (let p = 0; p < playersClone.length; p++) {
            playersClone[p].card = null;
            playersClone[p].cards.length = 0;
        }
        return {
            playersInitialized: playersInitialized,
            playersList: playersClone,
            activePlayerIndex: 0
        }
    }

    function getCurrentPlayer () {
        return {
            activePlayer: {...playersList[activePlayerIndex]},
            activePlayerIndex: activePlayerIndex
        }
    }

    return [
        playersList, setPlayersList,
        maxPlayers, setMaxPlayers,
        activePlayerIndex, setActivePlayerIndex,
        playersInitialized, setPlayersInitialized,
        playersInit, playersReset, getCurrentPlayer
    ];
}

/**
 * @class Player
 * @property name {string} The name of the player.
 * @property card {object} The card that was drawn.
 * @property cards {array} The cards on the board.
 * @property slots {number} The number of cards to make face up.
 * @property isTurn {boolean} Whether it is this player's turn.
 * @property isAuto {boolean} Whether the player is automated.
 */
export class Player {
    playerName = '';
    playerId = '';
    card = null;
    cards = [];
    slots = 10;
    isTurn = false;
    isAuto = false;

    constructor (name) {
        this.playerName = name;
        this.playerId  = uuidv4();
        this.card = null;
        this.cards = [];
        this.slots = 10;
        this.isAuto = true;
    }
}

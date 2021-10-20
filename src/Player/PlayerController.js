import React, { useState } from 'react';

import IndividualPlayerView from './IndividualPlayerView';

export default function PlayerController({ player }) {
    const [card, setCard] = useState(null);
    const [name, setName] = useState('');
    const [cards, setCards] = useState([]);
    const [slots, setSlots] = useState(10);
    const [isTurn, setIsTurn] = useState(false);
    const [isAuto, setIsAuto] = useState(false);
    
    return <IndividualPlayerView
        player={player}
        card={card}
        setCard={setCard}
        name={name}
        setName={setName}
        cards={cards}
        setCards={setCards}
        slots={slots}
        setSlots={setSlots}
        isTurn={isTurn}
        setIsTurn={setIsTurn}
        isAuto={isAuto}
        setIsAuto={setIsAuto}
    />
}

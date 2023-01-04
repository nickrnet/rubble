import React, { useEffect, useState } from 'react';

export default function CardController (
    suit,
    value
) {
    const [name, setName] = useState('');
    const [faceUp, setFaceUp] = useState(false);
    const [canBeStolen, setCanBeStolen] = useState(false);

    function emptyCard () {
        return (<div></div>);
    }

    function init () {
        if (value === 1) {
            setName('Ace');
            setCanBeStolen(true);
        }
        else if (value === 11) {
            setName('Jack');
        }
        else if (value === 12) {
            setName('Queen');
        }
        else if (value === 13) {
            setName('King');
        }
        else {
            setName(String(value));
            setCanBeStolen(true);
        }
    }

    function flip () {
        if (faceUp) {
            setFaceUp(false);
        }
        else {
            setFaceUp(true);
        }
    }

    return emptyCard();
}

import React, { useEffect } from 'react';

import GameController from './Game/GameController';

export default function App() {
    useEffect(() => {
        console.log('Something rerendered the App.');
    });
    return (
        <GameController />
    );
}

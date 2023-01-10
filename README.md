# Rubble
Rubble is a take on a card game we call _Garbage_. It is played with 2-4 players with one deck of standard playing cards of Aces thru 10s, Jacks, Queens, and Kings, without Joker cards.

# Documentation

See [doc/Development.md](doc/Development.md) for how to contribute to this project.

# Game Play

A player is designated the dealer and deals 10 cards face down to the other players. The players do not look at their cards but arrange them in a 5x5 grid. The rest of the deck is placed in the middle to draw from. The goal of the round is to flip the face down cards up in order 1-10.

The player to the right of the dealer then draws a card. If the card is an Ace thru 10, the appropriate spot of the value of the card, flipping the card that was face down. If the card the player is holding cannot be played, it is discarded.

If there are cards in the discard pile, the next player may draw the top card instead of drawing from the deck.

Kings are "wild cards" and can be placed in any slot on a player's board, whether face up/down or a face card. Queens allow the player to steal another face up card from another player. Jacks are end-of-turn cards and must be discarded.

A player is the winner of the round when all of their face down cards are face up in order. Then another round starts with the winner receiving 9 cards. The winner decreases the number of cards they have to turn over.

If a player only has one face down card, the King is not allowed to be played, but simply becomes like a Jack card to that player.

# Playing the Game

In this implementation, Rubble is played in a browser (Edge, Safari, Google Chrome). To draw a card from the deck, simply click the Deck. If there is a card in the Discard and you want to draw it, simply click the one that is shown.

There is only one live player, the other 3 will auto play their cards; except Queens and Kings will be discarded.

Once you have a card, it shows up for all to see. To place it or discard it, simply click the spot you would like to place the card in.

## Limitations

- Queens do not currently allow stealing, they are treated like Jacks.
- Kings and Queens are simply discarded by auto-players, like Jacks.

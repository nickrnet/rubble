import DeckView from './DeckView';

export default function DeckController({ deck, drawFromDeckHandler }) {
    return <DeckView cards={deck.cards} drawFromDeckHandler={drawFromDeckHandler} />;
}

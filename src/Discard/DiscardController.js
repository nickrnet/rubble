import DiscardView from './DiscardView';

export default function DiscardController({ discard, drawFromDiscardHandler }) {
    return <DiscardView cards={discard.cards} drawFromDiscardHandler={drawFromDiscardHandler} />;
}

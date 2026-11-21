import "./App.css";
import { useTable } from "spacetimedb/react";
import { tables } from "./module_bindings";
import { Presentation } from "./components/presentation/presentation";
import type { Deck, Slide, Participant } from "./module_bindings/types";
import { Lobby } from "./components/lobby/lobby";
import { Prepare } from "./components/Prepared/prepare";

function routeBasedOnDeckState(
  deck: Deck,
  slides: readonly Slide[],
  participants: readonly Participant[],
) {
  switch (deck.state.tag) {
    case "Prepared":
      return <Prepare />;
    case "Lobby":
      return <Lobby participants={participants} deck={deck} />;
    case "Ongoing":
      return <Presentation deck={deck} slides={slides} users={participants} />;
  }
}

function App() {
  const [decks, deckReady] = useTable(tables.deck);
  const [slides, slidesReady] = useTable(tables.slide);
  const [participants, participantsReady] = useTable(tables.participant);

  if (!deckReady || !slidesReady || !participantsReady) {
    return <div>loading</div>;
  }

  const deck = decks[0];
  if (!deck) {
    return <div>no deck found</div>;
  }

  return <div className="bg-muted ">{routeBasedOnDeckState(deck, slides, participants)}</div>;
}

export default App;

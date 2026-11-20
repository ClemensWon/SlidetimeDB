import "./App.css";
import { useTable } from "spacetimedb/react";
import { tables } from "./module_bindings";
import { Presentation } from "./components/presentation/presentation";
import type { Deck, Slide, User } from "./module_bindings/types";
import { Lobby } from "./components/lobby/lobby";
import { Prepare } from "./components/Prepared/prepare";

function routeBasedOnDeckState(deck: Deck, slides: readonly Slide[], users: readonly User[]) {
  switch (deck.deckState.tag) {
    case "Prepared":
      return <Prepare/>
    case "Lobby":
      return <Lobby/>
    case "Ongoing":
      return <Presentation deck={deck} slides={slides} users={users}/>;
  }
}

function App() {
  const [decks, deckReady] = useTable(tables.deck);
  const [slides, slidesReady] = useTable(tables.slide);
  const [users, usersReady] = useTable(tables.user);

  if (!deckReady || !slidesReady || !usersReady) {
    return <div>loading</div>;
  }

  const deck = decks[0];
  if (!deck) {
    return <div>no deck found</div>;
  }

  return (
    <div className="bg-muted ">
      {routeBasedOnDeckState(deck, slides, users)}
    </div>
  )
}

export default App;

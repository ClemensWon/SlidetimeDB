import "./App.css";
import { useTable } from "spacetimedb/react";
import { tables } from "./module_bindings";
import { Presentation } from "./components/presentation/presentation";

function App() {
  const [decks, deckReady] = useTable(tables.deck);
  const [slides, slidesReady] = useTable(tables.slide);

  if (!deckReady || !slidesReady) {
    return <div>loading</div>;
  }

  const deck = decks[0];
  if (!deck) {
    return <div>no deck found</div>;
  }


  return <Presentation deck={deck} slides={slides} />;
}

export default App;

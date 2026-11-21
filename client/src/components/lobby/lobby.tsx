import { useParticipant } from "@/hooks/useParticipant";
import type { Deck, Participant } from "@/module_bindings/types";
import { PresenterLobby } from "./presenterLobby";
import { ParticipantLobby } from "./participantLobby";

type LobbyProps = {
  deck: Deck;
  participants: readonly Participant[];
};

export function Lobby(props: LobbyProps) {
  const { isPresenter } = useParticipant(props.deck, props.participants);
  return isPresenter ? (
    <PresenterLobby joinUrl="clemens.wondrak.at" participants={props.participants} />
  ) : (
    <ParticipantLobby {...props} />
  );
}

import type { CommandCtx } from "../../domain/schema";
import { SenderError } from "spacetimedb";
import { TeamType } from "../../domain/objects/teamEnum";
import { useTugOfWarQuery } from "../queries/tugOfWarQuery";
import { TugOfWarState } from "../../domain/tables/tugOfWar";
import { useParticipantsQuery } from "../queries/participantQuery";
import { useUserQuery } from "../queries/userQuery";
import { useTeamQuery } from "../queries/teamQuery";

export function useTugOfWarCommand(ctx: CommandCtx) {
  const tugOfWarQuery = useTugOfWarQuery(ctx.db);
  const particpantQuery = useParticipantsQuery(ctx.db);
  const userQuery = useUserQuery(ctx.db);
  const teamQuery = useTeamQuery(ctx.db);

  function joinTeam(teamType: TeamType) {
    const tugOfWar = tugOfWarQuery.getCurrent();

    if (tugOfWar.state.tag !== "joiningTeams") {
      throw new SenderError("tug of war game isn't in the right phase to join teams");
    }

    const teams = teamQuery.getByTugOfWarId(tugOfWar.id);
    const senderIdentity = ctx.sender;

    for (const team of teams) {
      const isInTeam = team.members.some((member) => senderIdentity.isEqual(member));
      if (isInTeam) {
        throw new SenderError("already in a team");
      }
    }

    const chosenTeam = teams.find((team) => team.teamType.tag === teamType.tag);
    if (!chosenTeam) {
      throw new SenderError("can't finden chosen team");
    }

    const newMembers = chosenTeam.members.concat(senderIdentity);
    ctx.db.team.id.update({ ...chosenTeam, members: newMembers });
  }

  function pullTug() {
    const tugOfWar = tugOfWarQuery.getCurrent();

    if (tugOfWar.state.tag !== "ongoing") {
      throw new SenderError("you can only pull when the tug of war is ongoing");
    }

    const teams = teamQuery.getByTugOfWarId(tugOfWar.id);

    const senderIdentity = ctx.sender;

    const teamOfSender = teams.find((team) =>
      team.members.some((member) => member.isEqual(senderIdentity)),
    );

    if (!teamOfSender) {
      throw new SenderError("sender doesn't belong to any team");
    }

    const direction = teamOfSender.teamType.tag === "TeamA" ? 1 : -1;

    const updateCount = tugOfWar.updateCount + 1;
    const newScore = tugOfWar.score + direction;
    let newState: TugOfWarState = tugOfWar.state;

    if (newScore > 19 || newScore < -19) {
      newState = {
        tag: "results",
      };
      for (const member of teamOfSender.members) {
        const participant = particpantQuery.getByIdentityOrThrow(member);
        const newParticipantScore = participant.score + 3;
        ctx.db.participant.identity.update({ ...participant, score: newParticipantScore });
      }
    }

    ctx.db.tugOfWar.id.update({
      ...tugOfWar,
      score: newScore,
      updateCount: updateCount,
      state: newState,
    });
  }

  function openJoiningTeams() {
    userQuery.throwIfNotPresenter(ctx.sender);
    const tugOfWar = tugOfWarQuery.getCurrent();
    if (tugOfWar.state.tag !== "scheduled") {
      throw new SenderError("only a scheduled tug of war game can move into joining teams state");
    }
    ctx.db.tugOfWar.id.update({
      ...tugOfWar,
      state: { tag: "joiningTeams" },
    });
  }

  function startTugOfWar() {
    userQuery.throwIfNotPresenter(ctx.sender);
    const tugOfWar = tugOfWarQuery.getCurrent();
    if (tugOfWar.state.tag !== "joiningTeams") {
      throw new SenderError("only a joining teams tug of war game can move into state ongoing");
    }
    ctx.db.tugOfWar.id.update({
      ...tugOfWar,
      state: { tag: "ongoing" },
    });
  }

  return {
    joinTeam,
    pullTug,
    openJoiningTeams,
    startTugOfWar,
  };
}

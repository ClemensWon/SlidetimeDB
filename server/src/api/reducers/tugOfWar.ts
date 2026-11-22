import { teamType } from "../../domain/objects/teamEnum";
import { spacetimedb } from "../../domain/schema";
import { useTugOfWarCommand } from "../../services/commands/tugOfWarCommand";

export const startTugOfWar = spacetimedb.reducer({}, (ctx) => {
  const tugOfWarCommand = useTugOfWarCommand(ctx);
  tugOfWarCommand.startTugOfWar();
});

export const openTeamsTugOfWar = spacetimedb.reducer({}, (ctx) => {
  const tugOfWarCommand = useTugOfWarCommand(ctx);
  tugOfWarCommand.openJoiningTeams();
});

export const joinTeamTugOfWar = spacetimedb.reducer({ teamType: teamType }, (ctx, { teamType }) => {
  const tugOfWarCommand = useTugOfWarCommand(ctx);
  tugOfWarCommand.joinTeam(teamType);
});

export const pullOnTug = spacetimedb.reducer({}, (ctx) => {
  const tugOfWarCommand = useTugOfWarCommand(ctx);
  tugOfWarCommand.pullTug();
});

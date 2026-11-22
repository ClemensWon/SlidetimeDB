import { TeamValues } from "../domain/tables/teamMembership";
import { TugOfWarValues } from "../domain/tables/tugOfWar";

export const tugOfWars: TugOfWarValues[] = [
  {
    id: 0,
    name: "Whats the better way to book your times",
  },
  {
    id: 1,
    name: "Whats the best type of Mahlzeit packeging",
  },
];

export const teams: TeamValues[] = [
  {
    id: 0,
    name: "Early Bookers",
    teamType: { tag: "TeamA" },
    tugOfWarId: 0,
  },
  {
    id: 1,
    name: "Late Bookers",
    teamType: { tag: "TeamB" },
    tugOfWarId: 0,
  },
  {
    id: 2,
    name: "Good old plastic",
    teamType: { tag: "TeamA" },
    tugOfWarId: 1,
  },
  {
    id: 3,
    name: "Premium metal",
    teamType: { tag: "TeamB" },
    tugOfWarId: 1,
  },
];

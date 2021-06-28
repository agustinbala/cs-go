export interface IMatch {
  id: number;
  date: string;
  team1: ITeam;
  team2: ITeam;
}

interface ITeam {
  id: number;
  name: string;
}

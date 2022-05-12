export interface IBet {
  id: number;
  betType: string;
  price: number;
  odds: number;
  win: boolean;
  date: string;
  match: IBetMatch;
  winnerTeam: IBetTeam;
  finished: boolean;
}

export interface IBetMatch {
  id: number;
  teams: IBetTeam[];
  winner: IBetTeam;
  date: string;
}

export interface IBetTeam {
  id: number;
  name: string;
}

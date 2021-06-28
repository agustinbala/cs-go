export interface BetResponse {
  id: number;
  betType: BetTypeResponse;
  price: number;
  odds: number;
  win: boolean;
  date: string;
  match: BetMatchResponse;
  winnerTeam: TeamResponse;
}

export interface BetMatchResponse {
  id: number;
  team1: TeamResponse;
  team2: TeamResponse;
  winner: TeamResponse;
  date: string;
}

interface TeamResponse {
  id: number;
  name: string;
}

interface BetTypeResponse {
  id: number;
  name: string;
}

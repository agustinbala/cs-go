export interface MatchResponse {
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

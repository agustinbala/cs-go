export interface MatchResponse {
    status: string
    winner_id: number
    number_of_games: number
    scheduled_at: string
    opponents: OpponentsResponse[]
    league: LeagueResponse
    streams: StreamResponse
    results: ResultResponse[]
    serie: SerieResponse    
  }
  
  interface LeagueResponse {
    image_url: string
    name: string
  }
  
  interface SerieResponse {
    id: number
    begin_at: string
    tier: string
  }
  
  interface StreamResponse {
    id: number
    english: StreamDetailResponse
  }
  
  interface StreamDetailResponse {
    raw_url: string
  }
  
  interface OpponentsResponse {
    opponent: TeamResponse
  }
  
  interface TeamResponse {
    name: string
    image_url: string,
    id: number
  }
  
  interface ResultResponse {
    score : number
    team_id : number
  }
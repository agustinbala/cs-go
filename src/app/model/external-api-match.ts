export interface IExternalAPIMatch {
  id: number;
  link: string;
  time: string;
  event: IEvent;
  tier: string;
  map: string;
  teams: ITeam[];
  hltvLink: string;
  status: string;
}

interface IEvent {
  name: string;
  crest: string;
}

interface ITeam {
  name: string;
  crest: string;
  score: number;
}

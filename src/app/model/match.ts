export interface IMatch {
    id: number
    link: string
    time: string
    event: IEvent
    stars: boolean
    map: string
    teams: ITeam[]
}

interface IEvent {
    name: string
    crest: string
}

interface ITeam {
    name: string
    crest: string,
    score: number
}
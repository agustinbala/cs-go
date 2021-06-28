import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatchResponse } from "./response/match-response";
import { environment } from "src/environments/environment";
import { BetResponse } from "./response/bet-response";

export interface MatchRequest {
  id: number;
  date: string;
  team1: string;
  team2: string;
}

@Injectable({
  providedIn: "root",
})
export class MatchesService {
  constructor(private http: HttpClient) {}

  async getRunning(): Promise<MatchResponse[]> {
    const url = environment.api + "/matches/running";
    return this.http.get<MatchResponse[]>(url).toPromise();
  }

  async createMatch(match: MatchRequest): Promise<MatchResponse> {
    const url = environment.api + "/matches";
    return this.http.post<MatchResponse>(url, match).toPromise();
  }

  async deleteMatch(id: number): Promise<MatchResponse> {
    const url = environment.api + "/matches/" + id;
    return this.http.delete<MatchResponse>(url).toPromise();
  }

  async getBets(id: number): Promise<BetResponse[]> {
    const url = environment.api + "/matches/" + id + "/bets";
    return this.http.get<BetResponse[]>(url).toPromise();
  }
}

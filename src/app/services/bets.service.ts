import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BetResponse } from "./response/bet-response";

export interface BetRequest {
  id: number;
  date: string;
  matchId: number;
  betType: number;
  price: number;
  odds: number;
  winnerTeamId: number;
}

@Injectable({
  providedIn: "root",
})
export class BetsService {
  constructor(private http: HttpClient) {}

  async getLast(): Promise<BetResponse[]> {
    const url = environment.api + "/bets/last";
    return this.http.get<BetResponse[]>(url).toPromise();
  }

  async create(bet: BetRequest): Promise<BetResponse> {
    const url = environment.api + "/bets";
    return this.http.post<BetResponse>(url, bet).toPromise();
  }

  async delete(id: number): Promise<BetResponse> {
    const url = environment.api + "/bets/" + id;
    return this.http.delete<BetResponse>(url).toPromise();
  }

  async win(id: number): Promise<BetResponse> {
    const url = environment.api + "/bets/" + id + "/win";
    return this.http.put<BetResponse>(url, null).toPromise();
  }

  async lost(id: number): Promise<BetResponse> {
    const url = environment.api + "/bets/" + id + "/lost";
    return this.http.put<BetResponse>(url, null).toPromise();
  }
}

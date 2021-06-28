import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BetTypeResponse } from "./response/bet-type-response";

@Injectable({
  providedIn: "root",
})
export class BetTypeService {
  constructor(private http: HttpClient) {}

  async getAll(): Promise<BetTypeResponse[]> {
    const url = environment.api + "/bet-types";
    return this.http.get<BetTypeResponse[]>(url).toPromise();
  }
}

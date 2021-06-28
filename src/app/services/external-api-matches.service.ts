import { Injectable } from "@angular/core";
import { CONFIG } from "./config";
import { HttpClient } from "@angular/common/http";
import { ExternalAPIMatchResponse } from "./response/external-api-match-response";

@Injectable({
  providedIn: "root",
})
export class ExternalAPIMatchesService {
  constructor(private http: HttpClient) {}

  async getExternalAPIMatches(): Promise<ExternalAPIMatchResponse[]> {
    const url = `${CONFIG.PANDA_BASE}${CONFIG.MATCHES}${CONFIG.TOKEN}&per_page=1000&filter[status]=not_started,running&sort=scheduled_at`;
    return this.http.get<ExternalAPIMatchResponse[]>(url).toPromise();
  }
}

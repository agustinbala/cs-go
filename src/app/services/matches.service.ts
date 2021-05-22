import { Injectable } from '@angular/core';
import { CONFIG, MAPS } from './config';
import * as cheerio from 'cheerio'
import fetch from 'node-fetch'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatchResponse } from './response/match-response';




@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  constructor( private http: HttpClient) { }

  async getCurrentMatches() : Promise<MatchResponse[]> {
    const url = `${CONFIG.BASE}${CONFIG.MATCHES_RUNNING}${CONFIG.TOKEN}`
    return this.http.get<MatchResponse[]>(url).toPromise();      
  }

  async getUpcomingMatches() : Promise<MatchResponse[]>{
    const url = `${CONFIG.BASE}${CONFIG.MATCHES_UPCOMING}${CONFIG.TOKEN}`
    return this.http.get<MatchResponse[]>(url).toPromise();      
  }
}

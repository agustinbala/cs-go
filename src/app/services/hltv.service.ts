import { Injectable } from '@angular/core';
import { IMatch } from '../model/match';
import { CONFIG } from './config';
import * as cheerio from 'cheerio'
import fetch from 'node-fetch'

export interface HLTVMatch {
  link: string
  time: string
  event: string
  team1: string
  team2 : string
}

export interface HLTVResponse {
  currentMatches: HLTVMatch[]
  upcomingMatches: HLTVMatch[] 
}

export interface HLTVStats {
  mapsStats: HLTVMapStats[] 
  bets : Bets
  headToHead : number[]
}

export interface HLTVMapStats {
  map: string
  team1MapDetailLink : string
  team2MapDetailLink : string
  team1WinPercentage : string
  team2WinPercentage : string
  team1MapTimesPlayed : string
  team2MapTimesPlayed : string
  team1Pick : boolean
  team2Pick : boolean
  isPick : boolean
}

export interface Bets {
  team1Winning: string
  team2Winning: string 
}

@Injectable({
  providedIn: 'root'
})
export class HltvService {

  constructor() { }

  async getCurrentMatchLink() {
    const url = `${CONFIG.BASE_HLTV}${CONFIG.MATCHES_HLTV}`
    try {
      const body = await (
        await fetch(url, {
          headers: { 'User-Agent': 'node-fetch' },
        })
      ).text()
      const $ = cheerio.load(body, {
        normalizeWhitespace: true,
      })
  
      const allContent = $('.liveMatch')
      const currentMatches: HLTVMatch[] = []
  
      allContent.map((_i, element) => {
        const el = $(element)
  
        const link = el.children('a').attr('href')!
        const time = "LIVE";
        const event = el.find('.matchEventName').text();
        
        const team1 = el.find('.matchTeam').first().find('.matchTeamName').text();
        const team2 = el.find('.matchTeam').last().find('.matchTeamName').text();
   
        const response: HLTVMatch = {
          link,
          time,
          event,
          team1,
          team2
        }
        currentMatches[currentMatches.length] = response
      })

      const upcomingMatches: HLTVMatch[] = []

      const allContentUpcoming = $('.upcomingMatch')
  
      allContentUpcoming.map((_i, element) => {
        const el = $(element)
  
        const link = el.children('a').attr('href')!
        const time = new Date(parseInt(el.find('.matchTime').attr('data-unix')!, 10)).toISOString()
        const event = el.find('.matchEventName').text()
  
        const team1 = el.find('.matchTeam.team1').find('.matchTeamName').text();
        const team2 = el.find('.matchTeam.team2').find('.matchTeamName').text();
  
  
        const response: HLTVMatch = {
          link,
          time,
          event,
          team1,
          team2
        }

        upcomingMatches[upcomingMatches.length] = response
      })

    
      const response : HLTVResponse = {
        currentMatches,
        upcomingMatches
      }
      return response
    } catch (error) {
      throw new Error(error)
    }
  }

  async getMatchDetail(link:string) {
    const url = `${CONFIG.BASE_HLTV}${link}`
    try {
      const body = await (
        await fetch(url, {
          headers: { 'User-Agent': 'node-fetch' },
        })
      ).text()
      const $ = cheerio.load(body, {
        normalizeWhitespace: true,
      })
  
      const allMaps = $('.map-stats-infobox-maps')
      const mapsStats: HLTVMapStats[] = []
      allMaps.map((_i, element) => {
      
          const el = $(element)
          const map = el.find('.map-stats-infobox-mapname-container')
                          .find('.map-stats-infobox-mapname-holder')
                          .find('.mapname').text();
          
          const team1El = el.find('.map-stats-infobox-stats').first();
          const team2El = el.find('.map-stats-infobox-stats').last();

          const team1MapDetailLink = team1El.find('.map-stats-infobox-winpercentage').children('a').attr('href')!
          const team2MapDetailLink = team2El.find('.map-stats-infobox-winpercentage').children('a').attr('href')!
          const team1WinPercentage = team1El.find('.map-stats-infobox-winpercentage').children('a').text();
          const team2WinPercentage = team2El.find('.map-stats-infobox-winpercentage').children('a').text();
          const team1MapTimesPlayed = team1El.find('.map-stats-infobox-maps-played').text();
          const team2MapTimesPlayed = team2El.find('.map-stats-infobox-maps-played').text();
          const team1Pick = team1El.find('.map-stats-infobox-pick').length != 0;
          const team2Pick = team2El.find('.map-stats-infobox-pick').length != 0;

          const mapStats: HLTVMapStats = {
            map, 
            team1MapDetailLink,
            team2MapDetailLink,
            team1WinPercentage,
            team2WinPercentage,
            team1MapTimesPlayed,
            team2MapTimesPlayed,
            team1Pick,
            team2Pick,
            isPick : team1Pick || team2Pick,
          }
  
          mapsStats[mapsStats.length] = mapStats
              
      })

      const team1Winning = "";
      const team2Winning = ""; 
      const headToHead = []

      const bets = {
        team1Winning,
        team2Winning
      }

      const response : HLTVStats = {
        mapsStats,
        bets,
        headToHead
      }
      
      return response
    } catch (error) {
      throw new Error(error)
    }
  }

}

import { Injectable } from '@angular/core';
import { IMatch } from '../model/match';
import { CONFIG, MAPS } from './config';
import * as cheerio from 'cheerio'
import fetch from 'node-fetch'

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  constructor() { }

  async getMatches() {
    const url = `${CONFIG.BASE}${CONFIG.MATCHES}`

    try {
      const body = await (
        await fetch(url, {
          headers: { 'User-Agent': 'node-fetch' },
        })
      ).text()
      const $ = cheerio.load(body, {
        normalizeWhitespace: true,
      })
  
      const allContent = $('.upcomingMatch')
      const matches: IMatch[] = []
  
      allContent.map((_i, element) => {
        const el = $(element)
  
        const link = el.children('a').attr('href')!
        const id = parseInt(link.split('/')[2], 10)
        const time = new Date(parseInt(el.find('.matchTime').attr('data-unix')!, 10)).toISOString()
        const event = {
          name: el.find('.matchEventName').text(),
          crest: el.find('.matchEventLogo').attr('src')!,
        }
        const stars = Number(el.attr('stars'))
        const map: keyof typeof MAPS = el.find('.matchMeta').text() as any
  
        const team1El = el.find('.matchTeam.team1')
        const team2El = el.find('.matchTeam.team2')
  
        const team1 = {
          name: team1El.find('.matchTeamName').text(),
          crest: team1El.find('.matchTeamLogo').attr('src')!,
          score: null
        }
  
        const team2 = {
          name: team2El.find('.matchTeamName').text(),
          crest: team2El.find('.matchTeamLogo').attr('src')!,
          score: null
        }
  
        const response: IMatch = {
          id,
          link,
          time,
          event,
          stars,
          map: MAPS[map] || map,
          teams: [team1, team2],
        }
  
        matches[matches.length] = response
      })
  
      if (!matches.length) {
        throw new Error(
          'There are no matches available, something went wrong. Please contact the library maintainer on https://github.com/dajk/hltv-api'
        )
      }
  
      return matches
    } catch (error) {
      throw new Error(error)
    }
  }

  async getCurrentMatches() {
    const url = `${CONFIG.BASE}${CONFIG.MATCHES}`

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
      const matches: IMatch[] = []
  
      allContent.map((_i, element) => {
        const el = $(element)
  
        const link = el.children('a').attr('href')!
        const id = parseInt(link.split('/')[2], 10)
        const time = "";//new Date(parseInt(el.find('.matchTime').attr('data-unix')!, 10)).toISOString()
        const event = {
          name: el.find('.matchEventName').text(),
          crest: el.find('.matchEventLogo').attr('src')!,
        }
        const stars = Number(el.attr('stars'))
        const map: keyof typeof MAPS = el.find('.matchMeta').text() as any
        
        const teamsContainer = el.find('.matchTeam');
        const team1El = teamsContainer.first();
        const team1ScoreEl = team1El.find('.matchTeamScore').children().first();
        const team2El = teamsContainer.last();
        const team1 = {
          name: team1El.find('.matchTeamName').text(),
          crest: team1El.find('.matchTeamLogo').attr('src')!,
          score: Number(team1El.find('.currentMapScore').text())
        }
  
        const team2 = {
          name: team2El.find('.matchTeamName').text(),
          crest: team2El.find('.matchTeamLogo').attr('src')!,
          score: Number(team2El.find('.currentMapScore').text())
        }
  
        const response: IMatch = {
          id,
          link,
          time,
          event,
          stars,
          map: MAPS[map] || map,
          teams: [team1, team2]
        }
  
        matches[matches.length] = response
      })
  
      if (!matches.length) {
        throw new Error(
          'There are no matches available, something went wrong. Please contact the library maintainer on https://github.com/dajk/hltv-api'
        )
      }
  
      return matches
    } catch (error) {
      throw new Error(error)
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { IMatch } from 'src/app/model/match';
import { HLTVMatch, HltvService } from 'src/app/services/hltv.service';
import { MatchesService } from 'src/app/services/matches.service';
import { MatchResponse } from 'src/app/services/response/match-response';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  todayMatches: IMatch[] = [];
  tomorrowMatches: IMatch[] = [];
  nextDaysMatches: IMatch[] = [];
  currentMatches: IMatch[] = [];
  currentMatchesFinished = false;
  upcomingMatchesFinished = false;

  constructor(private matchesService: MatchesService,
    private hltvService: HltvService) { }

  ngOnInit() {
    let today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.matchesService.getCurrentMatches().then(list => {
      this.currentMatches = [];
      list.forEach(match => {
        const imatch = this.convertMatch(match);
        if (imatch != null &&  this.isTopTier(match)) {
          this.currentMatches.push(imatch);
        }
      });
      this.currentMatchesFinished = true;
      if (this.upcomingMatchesFinished) {
        this.getCurrentMatchHLTVLink();
      }
    });

    this.matchesService.getUpcomingMatches().then(list => {
      this.todayMatches = [];
      this.tomorrowMatches = [];
      this.nextDaysMatches = [];
      list.forEach(match => {
        const imatch = this.convertMatch(match);
        if (imatch != null && this.isTopTier(match)) {
          if (this.isToday(today, new Date(imatch.time)) && this.notEmptyNames(imatch)) {
            this.todayMatches.push(imatch);
          } else if (this.isToday(tomorrow, new Date(imatch.time)) && this.notEmptyNames(imatch)) {
            this.tomorrowMatches.push(imatch);
          } else {
            this.nextDaysMatches.push(imatch);
          }
        }
      });
      this.upcomingMatchesFinished = true;
      if (this.currentMatchesFinished) {
        this.getCurrentMatchHLTVLink();
      }
    });
  }

  convertMatch(match: MatchResponse): IMatch {
    const id = match.serie.id;
    const link = match.streams.english.embed_url + "&parent=localhost";
    const time = match.scheduled_at;
    const event = {
      name: match.league.name,
      crest: match.league.image_url
    }
    const stars = match.serie.tier == 'a';
    const map = "BO" + match.number_of_games.toString();
    if (match.opponents.length == 2 && match.opponents[0].opponent != null && match.opponents[1].opponent != null) {
      const team1 = {
        name: match.opponents[0].opponent.name,
        crest: match.opponents[0].opponent.image_url,
        score: match.results[0].score
      }
      const team2 = {
        name: match.opponents[1].opponent.name,
        crest: match.opponents[1].opponent.image_url,
        score: match.results[1].score
      }
      const hltvLink = "";
      return {
        id,
        link,
        time,
        event,
        stars,
        map: map,
        teams: [team1, team2],
        hltvLink
      }
    } else return null;

  }

  onSelectMatch(match: IMatch): void {
    console.log(JSON.stringify(match));
  }

  isToday(today: Date, date: Date) {
    return date.getDate() == today.getDate() && date.getMonth() == today.getMonth()
  }

  notEmptyNames(match: IMatch) {
    return match.teams[0].name != "" && match.teams[1].name != "";
  }

  getCurrentMatchHLTVLink() {
    this.hltvService.getCurrentMatchLink().then(htlvResponse => {

      this.currentMatches.forEach(currentMatch => {
        htlvResponse.currentMatches.forEach(hltvMatch => {
          if (this.isSameTeam(currentMatch, hltvMatch)) {
            currentMatch.hltvLink = hltvMatch.link;
          }
        });
      });

      let today = new Date();

      this.todayMatches.forEach(currentMatch => {
        htlvResponse.upcomingMatches.forEach(hltvMatch => {
          if (this.isToday(today, new Date(hltvMatch.time))) {
            if (this.isSameTeamAndTime(currentMatch, hltvMatch)) {
              currentMatch.hltvLink = hltvMatch.link;
            }
          }
        });
      });

    });
  }

  isSameTeamAndTime(currentMatch: IMatch, hltvMatch: HLTVMatch) {
    console.log("Comparando "+currentMatch.teams[0].name+" "+currentMatch.teams[1].name+" "+hltvMatch.team1+" "+hltvMatch.team2+" ")
    return (hltvMatch.team1.toUpperCase().includes(currentMatch.teams[0].name.toUpperCase()) ||
      hltvMatch.team1.toUpperCase().includes(currentMatch.teams[1].name.toUpperCase()) ||
      hltvMatch.team2.toUpperCase().includes(currentMatch.teams[0].name.toUpperCase()) ||
      hltvMatch.team2.toUpperCase().includes(currentMatch.teams[1].name.toUpperCase()) && currentMatch.time == hltvMatch.time)
  }

  isSameTeam(currentMatch: IMatch, hltvMatch: HLTVMatch) {
    console.log("Comparando "+currentMatch.teams[0].name+" "+currentMatch.teams[1].name+" "+hltvMatch.team1+" "+hltvMatch.team2+" ")
    return hltvMatch.team1.toUpperCase().includes(currentMatch.teams[0].name.toUpperCase()) ||
    hltvMatch.team1.toUpperCase().includes(currentMatch.teams[1].name.toUpperCase()) ||
    hltvMatch.team2.toUpperCase().includes(currentMatch.teams[0].name.toUpperCase()) ||
    hltvMatch.team2.toUpperCase().includes(currentMatch.teams[1].name.toUpperCase());
  }

  isTopTier(match : MatchResponse){
    return match.serie.tier == 'a' || match.serie.tier == 'b';
  }
}

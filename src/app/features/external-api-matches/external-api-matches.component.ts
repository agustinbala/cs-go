import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { IExternalAPIMatch } from "src/app/model/external-api-match";
import { HLTVMatch, HltvService } from "src/app/services/hltv.service";
import { ExternalAPIMatchesService } from "src/app/services/external-api-matches.service";
import { ExternalAPIMatchResponse } from "src/app/services/response/external-api-match-response";
import { MatchResponse } from "src/app/services/response/match-response";

@Component({
  selector: "app-external-api-matches",
  templateUrl: "./external-api-matches.component.html",
  styleUrls: ["./external-api-matches.component.css"],
})
export class ExternalAPIMatchesComponent implements OnInit {
  todayMatches: IExternalAPIMatch[] = [];
  tomorrowMatches: IExternalAPIMatch[] = [];
  nextDaysMatches: IExternalAPIMatch[] = [];
  currentMatches: IExternalAPIMatch[] = [];
  fullList: IExternalAPIMatch[] = [];

  @Output()
  onMatchCreated: EventEmitter<MatchResponse> = new EventEmitter();

  constructor(
    private matchesService: ExternalAPIMatchesService,
    private hltvService: HltvService
  ) {}

  ngOnInit() {
    let today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    this.matchesService.getExternalAPIMatches().then((list) => {
      this.currentMatches = [];
      this.todayMatches = [];
      this.tomorrowMatches = [];
      this.nextDaysMatches = [];

      this.fullList = list
        .map((item) => this.convertMatch(item))
        .filter((imatch) => imatch != null && this.isTopTier(imatch));

      this.currentMatches = this.fullList.filter(
        (item) => item.status == "running"
      );

      this.todayMatches = this.fullList.filter(
        (imatch) =>
          this.isToday(today, new Date(imatch.time)) &&
          imatch.status != "running" &&
          this.notEmptyNames(imatch)
      );

      this.tomorrowMatches = this.fullList.filter(
        (imatch) =>
          this.isToday(tomorrow, new Date(imatch.time)) &&
          this.notEmptyNames(imatch)
      );

      this.nextDaysMatches = this.fullList.filter(
        (imatch) =>
          !this.isToday(today, new Date(imatch.time)) &&
          !this.isToday(tomorrow, new Date(imatch.time)) &&
          this.notEmptyNames(imatch)
      );

      this.getCurrentMatchHLTVLink();
    });
  }

  convertMatch(match: ExternalAPIMatchResponse): IExternalAPIMatch {
    const id = match.serie.id;
    const link = match.streams.english.embed_url + "&parent=localhost";
    const time = match.scheduled_at;
    const event = {
      name: match.league.name,
      crest: match.league.image_url,
    };
    const tier = match.serie.tier;
    const map = "BO" + match.number_of_games.toString();
    const status = match.status;
    if (
      match.opponents.length == 2 &&
      match.opponents[0].opponent != null &&
      match.opponents[1].opponent != null
    ) {
      const team1 = {
        name: match.opponents[0].opponent.name,
        crest: match.opponents[0].opponent.image_url,
        score: match.results[0].score,
      };
      const team2 = {
        name: match.opponents[1].opponent.name,
        crest: match.opponents[1].opponent.image_url,
        score: match.results[1].score,
      };
      const hltvLink = "";
      return {
        id,
        link,
        time,
        event,
        tier,
        map: map,
        teams: [team1, team2],
        hltvLink,
        status,
      };
    } else {
      return null;
    }
  }

  isToday(today: Date, date: Date) {
    return (
      date.getDate() == today.getDate() && date.getMonth() == today.getMonth()
    );
  }

  notEmptyNames(match: IExternalAPIMatch) {
    return match.teams[0].name != "" && match.teams[1].name != "";
  }

  getCurrentMatchHLTVLink() {
    this.hltvService.getCurrentMatchLink().then((htlvResponse) => {
      let list = htlvResponse.currentMatches.concat(
        htlvResponse.upcomingMatches
      );

      this.fullList.forEach((imatch) => {
        list.forEach((hltvMatch) => {
          if (this.isSameTeam(imatch, hltvMatch)) {
            imatch.hltvLink = hltvMatch.link;
          }
        });
      });
    });
  }

  isSameTeam(currentMatch: IExternalAPIMatch, hltvMatch: HLTVMatch) {
    return (
      ((currentMatch.hltvLink == "" &&
        hltvMatch.team1
          .toUpperCase()
          .includes(currentMatch.teams[0].name.toUpperCase())) ||
        hltvMatch.team1
          .toUpperCase()
          .includes(currentMatch.teams[1].name.toUpperCase())) &&
      (hltvMatch.team2
        .toUpperCase()
        .includes(currentMatch.teams[0].name.toUpperCase()) ||
        hltvMatch.team2
          .toUpperCase()
          .includes(currentMatch.teams[1].name.toUpperCase()))
    );
  }

  isTopTier(match: IExternalAPIMatch) {
    return true;
  }

  onMatchCreatedEvent(event: MatchResponse) {
    this.onMatchCreated.emit(event);
  }
}

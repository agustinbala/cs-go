import { Component, Input, OnInit } from "@angular/core";
import { IMatch } from "src/app/model/match";
import { MatchesService } from "src/app/services/matches.service";
import { MatchResponse } from "src/app/services/response/match-response";

@Component({
  selector: "app-match-list",
  templateUrl: "./match-list.component.html",
  styleUrls: ["./match-list.component.css"],
})
export class MatchListComponent implements OnInit {
  items: IMatch[] = [];

  @Input() set refreshMatches(value: MatchResponse) {
    this.getMatches();
  }

  constructor(private matchesService: MatchesService) {}

  ngOnInit() {
    this.getMatches();
  }

  getMatches() {
    this.matchesService.getRunning().then((matches) => {
      this.items = matches.map((match) => this.convertMatch(match));
    });
  }

  convertMatch(match: MatchResponse): IMatch {
    return {
      id: match.id,
      date: match.date,
      team1: { id: match.team1.id, name: match.team1.name },
      team2: { id: match.team2.id, name: match.team2.name },
    };
  }
}

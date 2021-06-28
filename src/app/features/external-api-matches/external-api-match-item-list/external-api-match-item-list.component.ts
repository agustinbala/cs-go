import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { IExternalAPIMatch } from "src/app/model/external-api-match";
import { DatePipe } from "@angular/common";
import { MatchesService } from "src/app/services/matches.service";
import { MatchResponse } from "src/app/services/response/match-response";

@Component({
  selector: "external-api-match-item-list",
  templateUrl: "./external-api-match-item-list.component.html",
  styleUrls: ["./external-api-match-item-list.component.css"],
})
export class ExternalAPIMatchListItemComponent implements OnInit {
  @Input() match: IExternalAPIMatch;
  @Input() isRunning: boolean = false;
  @Output()
  onMatchCreated: EventEmitter<MatchResponse> = new EventEmitter();

  constructor(
    private sanitization: DomSanitizer,
    private matchesService: MatchesService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {}

  getBackground() {
    return this.sanitization.bypassSecurityTrustStyle(
      `url(${this.match.event.crest})`
    );
  }

  addMatch(match: IExternalAPIMatch) {
    let newDate = new Date(match.time);
    const date = this.datePipe.transform(newDate, "yyyy-MM-dd'T'HH:mm:ssZ");
    const team1 = match.teams[0].name;
    const team2 = match.teams[1].name;
    const matchRequest = {
      id: null,
      date,
      team1,
      team2,
    };

    this.matchesService
      .createMatch(matchRequest)
      .then((match) => {
        this.onMatchCreated.emit(match);
      })
      .catch((err) => {
        console.log("Error creando partida: " + err);
      });
  }
}

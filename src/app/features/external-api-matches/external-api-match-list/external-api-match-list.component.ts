import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IExternalAPIMatch } from "src/app/model/external-api-match";
import { MatchResponse } from "src/app/services/response/match-response";

@Component({
  selector: "external-api-match-list",
  templateUrl: "./external-api-match-list.component.html",
  styleUrls: ["./external-api-match-list.component.css"],
})
export class ExternalAPIMatchListComponent implements OnInit {
  @Input() items: IExternalAPIMatch[];
  @Input() title: string = "";

  @Output()
  onMatchCreated: EventEmitter<MatchResponse> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onMatchCreatedEvent(event: MatchResponse) {
    this.onMatchCreated.emit(event);
  }
}

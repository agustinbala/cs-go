import { Component, OnInit } from "@angular/core";
import { IExternalAPIMatch } from "src/app/model/external-api-match";
import { MatchResponse } from "src/app/services/response/match-response";

@Component({
  selector: "app-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.css"],
})
export class ContainerComponent implements OnInit {
  refreshMatch: MatchResponse;

  constructor() {}

  ngOnInit() {}

  onMatchCreatedEvent(event: MatchResponse) {
    this.refreshMatch = event;
  }
}

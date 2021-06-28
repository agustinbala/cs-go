import { Component, Input, OnInit } from "@angular/core";
import { IBet } from "src/app/model/bet";
import { BetResponse } from "src/app/services/response/bet-response";

@Component({
  selector: "app-bets-item-list",
  templateUrl: "./bets-item-list.component.html",
  styleUrls: ["./bets-item-list.component.css"],
})
export class BetsItemListComponent implements OnInit {
  @Input() bet: IBet;

  constructor() {}

  ngOnInit() {}
}

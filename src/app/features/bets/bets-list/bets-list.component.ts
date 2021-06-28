import { Component, Input, OnInit } from "@angular/core";
import { IBet } from "src/app/model/bet";

@Component({
  selector: "app-bets-list",
  templateUrl: "./bets-list.component.html",
  styleUrls: ["./bets-list.component.css"],
})
export class BetsListComponent implements OnInit {
  @Input() items: IBet[];
  @Input() title: string = "";

  constructor() {}

  ngOnInit() {}
}

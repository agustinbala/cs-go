import { Component, OnInit } from "@angular/core";
import { SummaryService } from "src/app/services/summary.service";

@Component({
  selector: "app-summary",
  templateUrl: "./summary.component.html",
  styleUrls: ["./summary.component.css"],
})
export class SummaryComponent implements OnInit {
  inventory: number;
  betsExpenses: number;
  steamExpenses: number;
  betsRemaining: number;
  total: number;

  constructor(private summaryService: SummaryService) {}

  ngOnInit() {
    this.summaryService.getLast().then((expenses) => {
      this.inventory = expenses.inventory;
      this.betsExpenses = expenses.betsExpenses;
      this.steamExpenses = expenses.steamExpenses;
      this.betsRemaining = expenses.betsRemaining;
      this.total = this.inventory + this.betsExpenses + this.steamExpenses;
    });
  }

  getMoneyClass(money: number) {
    if (money < 0) {
      return "negative";
    } else {
      return "positive";
    }
  }
}

import { Component, OnInit } from "@angular/core";
import { IBet, IBetMatch, IBetTeam } from "src/app/model/bet";
import { BetsService } from "src/app/services/bets.service";
import {
  BetMatchResponse,
  BetResponse,
} from "src/app/services/response/bet-response";

@Component({
  selector: "app-bets",
  templateUrl: "./bets.component.html",
  styleUrls: ["./bets.component.css"],
})
export class BetsComponent implements OnInit {
  finishedBets: IBet[];
  currentBets: IBet[];
  summary = 0;

  constructor(private betsService: BetsService) {}

  ngOnInit() {
    this.betsService.getLast().then((bets) => {
      let items = bets.map((bet) => {
        return this.convertBet(bet);
      });

      this.currentBets = items.filter((bet) => !bet.finished);
      this.finishedBets = items.filter((bet) => bet.finished);
      this.finishedBets.forEach((item) => {
        let result = 0;
        if (item.win) {
          result = item.price * item.odds - item.price;
        } else {
          result = item.price * -1;
        }
        this.summary = this.summary + result;
      });
    });
  }

  convertBet(bet: BetResponse): IBet {
    const id = bet.id;
    const betType = bet.betType.name;
    const price = bet.price;
    const odds = bet.odds;
    const win = bet.win;
    const date = bet.date;
    const match = this.convertMatch(bet.match);
    let winnerTeam: IBetTeam = null;
    const finished = bet.finished;

    if (bet.winnerTeam) {
      winnerTeam = {
        id: bet.winnerTeam.id,
        name: bet.winnerTeam.name,
      };
    }

    return {
      id,
      betType,
      price,
      odds,
      win,
      date,
      match,
      winnerTeam,
      finished,
    };
  }

  convertMatch(match: BetMatchResponse): IBetMatch {
    const id = match.id;

    const team1 = {
      id: match.team1.id,
      name: match.team1.name,
    };
    const team2 = {
      id: match.team2.id,
      name: match.team2.name,
    };
    const date = match.date;
    let winner;

    if (match.winner) {
      winner = {
        id: match.winner.id,
        name: match.winner.name,
      };
    }

    return {
      id,
      teams: [team1, team2],
      winner,
      date,
    };
  }
}

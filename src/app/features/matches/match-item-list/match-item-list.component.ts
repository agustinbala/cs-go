import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
import { IBet, IBetTeam } from "src/app/model/bet";
import { IMatch } from "src/app/model/match";
import { BetTypeService } from "src/app/services/bet-type.service";
import { BetsService } from "src/app/services/bets.service";
import { MatchesService } from "src/app/services/matches.service";
import { BetResponse } from "src/app/services/response/bet-response";
import { AddBetDialogComponent } from "../add-bet-dialog/add-bet-dialog.component";

@Component({
  selector: "app-match-item-list",
  templateUrl: "./match-item-list.component.html",
  styleUrls: ["./match-item-list.component.css"],
})
export class MatchItemListComponent implements OnInit {
  @Input() match: IMatch;
  @Input() isRunning: boolean = false;
  @Output() onMatchDeleted: EventEmitter<IMatch> = new EventEmitter();
  showVideo = false;
  showStats = false;
  bets: IBet[] = [];

  constructor(
    public dialog: MatDialog,
    private matchesService: MatchesService,
    private betService: BetsService
  ) {}

  ngOnInit() {
    this.getBets();
  }

  getBets() {
    this.matchesService.getBets(this.match.id).then((list) => {
      this.bets = list.map((bet) => this.convertBet(bet));
    });
  }

  showVideoFrame() {
    this.showVideo = !this.showVideo;
  }

  delete() {
    this.matchesService.deleteMatch(this.match.id).then(() => {
      this.onMatchDeleted.emit(this.match);
    });
  }

  addBet() {
    let dialogRef = this.dialog.open(AddBetDialogComponent, {
      height: "400px",
      width: "450px",
      data: this.match,
    });

    dialogRef.afterClosed().subscribe((bet) => {
      this.getBets();
    });
  }

  convertBet(bet: BetResponse): IBet {
    const id = bet.id;
    const betType = bet.betType.name;
    const price = bet.price;
    const odds = bet.odds;
    const win = bet.win;
    const date = bet.date;
    const finished = bet.finished;
    let winnerTeam: IBetTeam = null;

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
      match: null,
      winnerTeam,
      finished,
    };
  }

  deleteBet(bet: BetResponse) {
    this.betService.delete(bet.id).then(() => {
      this.getBets();
    });
  }

  win(bet: BetResponse) {
    this.betService.win(bet.id).then(() => {
      this.getBets();
    });
  }

  lose(bet: BetResponse) {
    this.betService.lost(bet.id).then(() => {
      this.getBets();
    });
  }

  winnerTeam(team: IBetTeam) {
    this.matchesService.winner(this.match.id, team.id).then(() => {
      this.onMatchDeleted.emit(this.match);
    });
  }

  getVideoLink() {}
}

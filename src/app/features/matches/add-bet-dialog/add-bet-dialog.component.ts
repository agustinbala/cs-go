import { DatePipe } from "@angular/common";
import { Component, Inject, Input, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { IMatch } from "src/app/model/match";
import { BetTypeService } from "src/app/services/bet-type.service";
import { BetsService } from "src/app/services/bets.service";
import { BetTypeResponse } from "src/app/services/response/bet-type-response";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-add-bet-dialog",
  templateUrl: "./add-bet-dialog.component.html",
  styleUrls: ["./add-bet-dialog.component.css"],
})
export class AddBetDialogComponent implements OnInit {
  types: BetTypeResponse[] = [];
  betForm: FormGroup;

  constructor(
    private betTypeService: BetTypeService,
    private betService: BetsService,
    @Inject(MAT_DIALOG_DATA) public match: IMatch,
    public dialogRef: MatDialogRef<AddBetDialogComponent>,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.betTypeService.getAll().then((list) => {
      this.types = list;
    });

    this.betForm = this.formBuilder.group({
      type: ["", []],
      team: ["", []],
      price: ["", []],
      odds: ["", []],
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    let newDate = new Date();
    const date = this.datePipe.transform(newDate, "yyyy-MM-dd'T'HH:mm:ssZ");
    const betType = this.betForm.value.type;
    const price = this.betForm.value.price;
    const odds = this.betForm.value.odds;
    const matchId = this.match.id;
    const winnerTeamId = this.betForm.value.team;

    const request = {
      id: null,
      betType,
      price,
      odds,
      date,
      matchId,
      winnerTeamId,
    };
    this.betService.create(request).then((bet) => {
      console.log(JSON.stringify(bet));
      this.dialogRef.close(bet);
    });
  }
}

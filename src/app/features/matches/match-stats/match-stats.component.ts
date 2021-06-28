import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { IExternalAPIMatch } from "src/app/model/external-api-match";
import { HltvService, HLTVStats } from "src/app/services/hltv.service";

@Component({
  selector: "app-match-stats",
  templateUrl: "./match-stats.component.html",
  styleUrls: ["./match-stats.component.css"],
})
export class MatchStatsComponent implements OnInit {
  @Input() match: IExternalAPIMatch;
  @Output() close = new EventEmitter();
  stats: HLTVStats;
  displayedColumns: string[] = ["map", "team1", "team2"];

  constructor(private htlvService: HltvService) {}

  ngOnInit() {
    this.htlvService.getMatchDetail(this.match.hltvLink).then((stats) => {
      this.stats = stats;
    });
  }

  closeDialog() {
    this.close.emit(true);
  }
}

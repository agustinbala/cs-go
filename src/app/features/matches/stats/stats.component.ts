import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { IMatch } from 'src/app/model/match';
import { HltvService, HLTVStats } from 'src/app/services/hltv.service';

@Component({
  selector: 'app-match-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  @Input() match: IMatch;
  @Output() close = new EventEmitter();
  stats : HLTVStats

  constructor(private htlvService : HltvService) { }

  ngOnInit() {
    this.htlvService.getMatchDetail(this.match.hltvLink).then( stats => {
       this.stats = stats
    });
  }

  closeDialog(){
    this.close.emit(true);
  }

}

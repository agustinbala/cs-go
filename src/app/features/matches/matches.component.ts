import { Component, OnInit } from '@angular/core';
import { IMatch } from 'src/app/model/match';
import { MatchesService } from 'src/app/services/matches.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  matches: IMatch[];

  constructor(private matchesService : MatchesService) { }

  ngOnInit() {
    console.log("estoy!");
    this.matchesService.getMatches().then( list => this.matches = list);
  }

  onSelectMatch(match: IMatch): void {
    console.log(JSON.stringify(match));
  }

}

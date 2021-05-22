import { Component, OnInit } from '@angular/core';
import { IMatch } from 'src/app/model/match';
import { MatchesService } from 'src/app/services/matches.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  todayMatches: IMatch[];
  tomorrowMatches: IMatch[];
  nextDaysMatches: IMatch[];
  currentMatches: IMatch[];
  matches: IMatch[];

  constructor(private matchesService: MatchesService) { }

  ngOnInit() {
    let today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.matchesService.getMatches().then(list => {
      this.matches = list;
      this.todayMatches = list.filter(match =>
        this.isToday(today, new Date(match.time)) && this.notEmptyNames(match)
      );

      this.tomorrowMatches = list.filter(match =>
        this.isToday(tomorrow, new Date(match.time)) && this.notEmptyNames(match)
      );

      this.nextDaysMatches = list.filter(match =>
        !this.isToday(today, new Date(match.time)) && !this.isToday(tomorrow, new Date(match.time)) && this.notEmptyNames(match)
      )
    });

    this.matchesService.getCurrentMatches().then(list => {
      this.currentMatches = list;
    });
  }

  onSelectMatch(match: IMatch): void {
    console.log(JSON.stringify(match));
  }

  isToday(today: Date, date: Date) {
    return date.getDate() == today.getDate() && date.getMonth() == today.getMonth()
  }

  notEmptyNames(match: IMatch) {
    return match.teams[0].name != "" && match.teams[1].name != "";
  }

}

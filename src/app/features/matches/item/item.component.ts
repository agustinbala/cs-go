import { Component, Input, OnInit } from '@angular/core';
import { IMatch } from 'src/app/model/match';

@Component({
  selector: 'app-match-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() match: IMatch;

  constructor() { }

  ngOnInit() {
  }

}

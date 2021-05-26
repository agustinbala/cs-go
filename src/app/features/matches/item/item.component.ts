import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IMatch } from 'src/app/model/match';

@Component({
  selector: 'app-match-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() match: IMatch;
  @Input() isRunning: boolean = false;
  showVideo = false;
  showStats = false;

  constructor(private sanitization: DomSanitizer) { }

  ngOnInit() {
    
  }

  getBackground() {
    return this.sanitization.bypassSecurityTrustStyle(`url(${this.match.event.crest})`);
  }

  showVideoFrame(){
    this.showVideo = !this.showVideo;
  }

  getVideoLink() {
    return this.sanitization.bypassSecurityTrustResourceUrl(`${this.match.link}`);
  }

}

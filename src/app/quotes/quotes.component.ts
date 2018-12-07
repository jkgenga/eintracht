import { Component, OnInit } from '@angular/core';
import { OpenLigaDbService } from '../openligadb.service';
import { MatchDay } from '../types/matchDay';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {

  displayedColumns: string[] = ['game', 'home', 'away'];

  blafasel = 'dumpfbacke';
  matchDay: MatchDay;

  constructor(public bldataService: OpenLigaDbService) {
    // this.blafasel = new String('blafasel');
    console.log('QuotesComponent constructed ' + this.blafasel);
  }

  ngOnInit() {
    console.log('request match day 8');
    this.bldataService.fetchMatchDay('8')
    .subscribe(data => {
      console.log('here: ' + data)
      this.matchDay = data;
     });
  }

}

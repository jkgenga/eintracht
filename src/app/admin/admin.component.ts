import { Component, OnInit } from '@angular/core';
import { OpenLigaDbService } from '../openligadb.service';
import { Match } from '../types/match';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public bldataService: OpenLigaDbService) { }

  ngOnInit() {
    console.log('request season 2018');

    let matchDays: Match[];

    this.bldataService.fetchMatchDays(2018)
    .subscribe(data => {
      console.log('here: ' + data);
      matchDays = data;
     });
  }
}

import { Component, OnInit } from '@angular/core';
import { OpenLigaDbService } from '../openligadb.service';
import { SeasonService} from '../season.service';
import { Season } from '../types/season';
import { fromEventPattern } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public bldataService: OpenLigaDbService, public seasonService: SeasonService) { }

  ngOnInit() {
    console.log('request season 2018');

    let season: Season;

    this.bldataService.fetchSeason(2018)
    .subscribe(data => {
      console.log('here: ' + data);
      season = data;
     });

     this.seasonService.addSeason(season);
  }
}

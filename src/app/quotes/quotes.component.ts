import { Component, OnInit, ViewChild } from '@angular/core';
import { OpenLigaDbService } from '../openligadb.service';
import { Match } from '../types/match';
import { Season } from '../types/season';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {


  displayedColumns: string[] = ['matchDay', 'home', 'result', 'away'];
  resultsLength = 0;

  season: Season;
  data: Match [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(public bldataService: OpenLigaDbService) {
    // this.blafasel = new String('blafasel');
    console.log('QuotesComponent constructed ');
  }

  ngOnInit() {
    console.log('request season 2018');
     
    merge(this.paginator.page)
    .pipe(
      startWith({}),
      switchMap(() => {
        return this.bldataService.fetchMatchDay(2018, this.paginator.pageIndex + 1);
      }),
      map(data => {
        // Flip flag to show that loading has finished.
        this.resultsLength = 1;
        return data;
      }),
      catchError(() => {
        // Catch if the GitHub API has reached its rate limit. Return empty data.
        return observableOf([]);
      })
    ).subscribe(data => this.data = data);
  }
}

import { Injectable } from '@angular/core';
import { Configuration } from './app.configuration';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatchDay } from './types/matchDay';
import { Match } from './types/match';
import { Team } from './types/team';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class OpenLigaDbService {

  private actionUrl: string;
  private league: string;
  private season: string;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private configuration: Configuration) {
    console.log('BldataService constructed');
    this.actionUrl = configuration.blDataUrl;
    this.league = configuration.league;
    this.season = configuration.season;

  }

  // Spiele des 8. Spieltages der ersten Bundesliga 2016/2017:
  // https://www.openligadb.de/api/getmatchdata/bl1/2016/8
  public fetchMatchDay(matchDay: string): Observable<MatchDay> {
    let result: MatchDay;

    let endpoint = this.actionUrl + 'getmatchdata/' + this.league + '/' + this.season + '/' + matchDay;
    console.log('calling: ' + endpoint);
    return this.http.get(endpoint)
    .pipe(
      map(data => result = this.mapMatchDays(data)),
      tap(data => console.log('tap: ' + data))
    );
  }
  
  private mapMatchDays(matchDayData): MatchDay {
    // 'title': this.sanitizer.bypassSecurityTrustHtml(apiDataSinglePost.title),
    // 'content': this.sanitizer.bypassSecurityTrustHtml(apiDataSinglePost.content)
    console.log('matchDayData: ' + matchDayData);
    let matchDay: MatchDay = new MatchDay();
    matchDay.serialNr = matchDayData[0].Group.GroupOrderID;
    for (let i = 0; i < matchDayData.length; i++) {
      let match: Match = new Match();
      let home: Team = new Team();
      let away: Team = new Team();
      match.serialNr = i + 1;
      home.name = matchDayData[i].Team1.TeamName;
      away.name = matchDayData[i].Team2.TeamName;
      match.home = home;
      match.away = away;
      match.kickoff = matchDayData[i].MatchDateTime;
      match.date = matchDayData[i].MatchDateTime;
      matchDay.matches.push(match);
     }
    for (let i = 0; i < matchDay.matches.length; i++) {
      console.log('Match: ' + matchDay.matches[i].home.name + ' - ' + matchDay.matches[i].away.name);
    }
   return matchDay;
  }
}


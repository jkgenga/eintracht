import { Injectable } from '@angular/core';
import { Configuration } from './app.configuration';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Match } from './types/match';
import { Team } from './types/team';
import { Season } from './types/season';

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
  }

  public fetchSeason(season: number): Observable<Season> {
    let result: Season;

    let endpoint = this.actionUrl + 'getmatchdata/' + this.league + '/' + season;
    console.log('calling: ' + endpoint);
    return this.http.get(endpoint)
    .pipe(
      map(data => result = this.mapSeason(data)),
      tap(data => console.log('tap: ' + data))
    );
  }
  
 // Spiele des 8. Spieltages der ersten Bundesliga 2016/2017:
  // https://www.openligadb.de/api/getmatchdata/bl1/2016/8
  public fetchMatchDay(season: number, matchDay: number): Observable<Match[]> {
    let result: Match[];

    let endpoint = this.actionUrl + 'getmatchdata/' + this.league + '/' + season + '/' + matchDay;
    console.log('calling: ' + endpoint);
    return this.http.get(endpoint)
    .pipe(
      map(data => result = this.mapMatchDay(data)),
      tap(data => console.log('tap: ' + data))
    );
  }
  
 // Spiele des 8. Spieltages der ersten Bundesliga 2016/2017:
  // https://www.openligadb.de/api/getmatchdata/bl1/2016/8
  public fetchMatchDays(season: number): Observable<Match[]> {
    let result: Match[];

    let endpoint = this.actionUrl + 'getmatchdata/' + this.league + '/' + season;
    console.log('calling: ' + endpoint);
    return this.http.get(endpoint)
    .pipe(
      map(data => result = this.mapMatchDay(data)),
      tap(data => console.log('tap: ' + data))
    );
  }
  
  private mapSeason(matchDayData): Season {
    // 'title': this.sanitizer.bypassSecurityTrustHtml(apiDataSinglePost.title),
    // 'content': this.sanitizer.bypassSecurityTrustHtml(apiDataSinglePost.content)
    console.log('matchDayData: ' + matchDayData);
    let season: Season = new Season();
    for (let i = 0; i < matchDayData.length; i++) {
      season.matches.push(this.extractMatchData(matchDayData[i]));
     }
   return season;
  }

  private mapMatchDay(matchDayData): Match[] {
    // 'title': this.sanitizer.bypassSecurityTrustHtml(apiDataSinglePost.title),
    // 'content': this.sanitizer.bypassSecurityTrustHtml(apiDataSinglePost.content)
    console.log('matchDayData: ' + matchDayData);
    let matchDay: Match[] = [];
    for (let i = 0; i < matchDayData.length; i++) {
      matchDay.push(this.extractMatchData(matchDayData[i]));
     }
   return matchDay;
  }

  private extractMatchData(matchData): Match {
    let match: Match = new Match();
    let home: Team = new Team();
    let away: Team = new Team();
    match.home = home;
    match.away = away;
    match.matchDay = matchData.Group.GroupOrderID;
    match.kickoff = matchData.MatchDateTime;
    match.date = matchData.MatchDateTime;
    home.name = matchData.Team1.TeamName;
    away.name = matchData.Team2.TeamName;
    if (matchData.MatchResults.length > 1) {
      for (let i = 0; i < 2; i++){
        if (matchData.MatchResults[i].ResultTypeID == 2) {
          match.goalsHome = matchData.MatchResults[i].PointsTeam1;
          match.goalsAway = matchData.MatchResults[i].PointsTeam2;
        }
      }
    }
    return match;
  }
}


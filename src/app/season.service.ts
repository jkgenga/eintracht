import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  uri = 'http://localhost:4000/seasons';


  constructor(private http: HttpClient) { }

  addSeason(season) {
    console.log('addSeason');
    this.http.post(`${this.uri}/add`, season)
        .subscribe(res => console.log('Done'));
  }
}


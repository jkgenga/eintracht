import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class Configuration {
    public blDataUrl = 'https://www.openligadb.de/api/';
    public league = 'bl1';
    public season = '2018';
}

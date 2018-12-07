
import { SafeHtml } from '@angular/platform-browser';

export interface Team {
  'id': SafeHtml;
  'name': SafeHtml;
}

export interface Match {
  'id': SafeHtml;
  'date': SafeHtml;
  'kickoff': SafeHtml;
  'home': Team;
  'away': Team;
}

export interface MatchDay {
  'id': SafeHtml;
  'serialNr': SafeHtml;
  'matches': Match[];
}

export interface Season {
  'id': SafeHtml;
  'year': SafeHtml;
  'matchDays': MatchDay[];
}
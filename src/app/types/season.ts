import { SafeHtml } from '@angular/platform-browser';
import {  MatchDay } from "./matchDay";

export class Season {
  'id': SafeHtml;
  'year': SafeHtml;
  'matchDays': MatchDay[];
}
import { SafeHtml } from '@angular/platform-browser';
import {  Match } from "./match";
import { MatchDay } from './bltypes';

export class Season {
  'id': SafeHtml;
  'year': SafeHtml;
  'matches': Match[] = [];
}
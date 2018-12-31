import { SafeHtml } from '@angular/platform-browser';
import {  Match } from './match';

export class Season {
  'year': SafeHtml;
  'matches': Match[] = [];
}

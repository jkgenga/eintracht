import { SafeHtml, SafeValue } from '@angular/platform-browser';
import {  Match } from "./match";

export class MatchDay {
  'id': SafeValue;
  'serialNr': SafeValue;
  'matches': Match[] = [];
}
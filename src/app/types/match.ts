import { SafeValue } from '@angular/platform-browser';
import { Team } from "./team";

export class Match {
  'id': SafeValue;
  'serialNr': SafeValue;
  'date': SafeValue;
  'kickoff': SafeValue;
  'home': Team;
  'away': Team;
}
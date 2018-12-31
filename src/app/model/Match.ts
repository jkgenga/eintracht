import { Team } from './team';

export class Match {
  'matchDay': String;
  'date': String;
  'kickoff': String;
  'home': Team;
  'away': Team;
  'goalsHome': Number;
  'goalsAway': Number;
}

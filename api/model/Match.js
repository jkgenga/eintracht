const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
const Match = new Schema({
  matchDay: {
    type: Number
  },
  date: {
    type: String
  },
  kickoff: {
    type: String
  },
  home: {
    type: String
  },
  away: {
    type: String
  },
  goalsHome: {
    type: Number
  },
  goalsAway: {
    type: Number
  }
});

module.exports = mongoose.model('Match', Match);

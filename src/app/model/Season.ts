import { Match } from "./match";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Season = new Schema({
  year: {
    type: String
  },
  matches: {
    type: Match[]
  },
},{
    collection: 'season'
});

module.exports = mongoose.model('Season', Season);

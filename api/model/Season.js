const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Match = require('./Match');

// Define collection and schema for Business
const Season = new Schema({
  year: {
    type: String
  },
  matches: [ {type: Schema.ObjectId, ref: 'Match'} ],
  });

module.exports = mongoose.model('Season', Season);

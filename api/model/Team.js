const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
const Team = new Schema({
  name: {
    type: String
  }
});

module.exports = mongoose.model('Team', Team);

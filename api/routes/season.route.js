const express = require('express');
const app = express();
const seasonRoutes = express.Router();

// Require Season model in our routes module
//let season = require('../src/app/types/season');
let Season = require('../model/Season');
let Match = require('../model/Match');

// Defined store route
seasonRoutes.route('/add').post(function (req, res) {
  console.log('add season');
  let season = new Season();
  season.year = req.body.year;
  let c = req.body.matches.length;
  for (let i = 0; i < c; i++) {
    let match = new Match();
    season.matches.push(match);
  }

  //  let season = new Season(req.body);
  season.save()
    .then(Season => {
      res.status(200).json({'Season': 'Season in added successfully'});
    })
    .catch(err => {
      console.log('add, err: ' + err);
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
seasonRoutes.route('/').get(function (req, res) {
    Season.find(function (err, season){
    if(err){
      console.log(err);
    }
    else {
      res.json(season);
    }
  });
});

// Defined edit route
seasonRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Season.findById(id, function (err, seasons){
      res.json(seasons);
  });
});

//  Defined update route
seasonRoutes.route('/update/:id').post(function (req, res) {
    Season.findById(req.params.id, function(err, next, Season) {
    if (!Season)
      return next(new Error('Could not load Document'));
    else {
      Season.save().then(Season => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
seasonRoutes.route('/delete/:id').get(function (req, res) {
    Season.findByIdAndRemove({_id: req.params.id}, function(err, Season){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = seasonRoutes;

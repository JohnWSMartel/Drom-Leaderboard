const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let ScoreModel = {};

// mongoose.Types.ObjectID is a function that
// converts string ID to real mongo ID
// const convertId = mongoose.Types.ObjectId;
const setTeam = (team) => _.escape(team).trim();

const scoreSchema = new mongoose.Schema({
  team: {
    type: String,
    required: true,
    trim: true,
    set: setTeam,
  },
  score: {
    type: Number,
    min: 0,
    required: true,
  },
  streak: {
    type: Number,
    min: 0,
    required: true,
  },
  createdData: {
    type: Date,
    default: Date.now,
  },
});

scoreSchema.statics.toAPI = (doc) => ({
  team: doc.team,
  score: doc.score,
  streak: doc.streak,
});

scoreSchema.statics.findAll = (callback) =>
    ScoreModel.find().select('team score streak').exec(callback);

ScoreModel = mongoose.model('Score', scoreSchema);

module.exports.scoreModel = ScoreModel;
module.exports.scoreSchema = scoreSchema;

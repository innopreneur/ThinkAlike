const mongoose = require('mongoose');
const gameSchema = require('../schemas/GameSchema').GameSchema;

let GameModel = mongoose.model('games', gameSchema);


//save new game
 exports.saveNewGame = (newGame, cb) => {
  let game = new GameModel(newGame);
  GameModel.updateOne({}, {$push: {games: newGame}},(err, data) => {
      if (err) return cb(err);
      cb(null, data);
    });
}

//find all games
 exports.findAllGames = (query, cb) => {
  GameModel.find(query, (err, games) => {
    console.log(games[0].games)
    if (err) return cb(err);
    cb(null, games[0].games);
  })
}

//find all active games
exports.findActiveGames = (cb) => {
  GameModel.find({isActive: true}, (err, games) => {
    if (err) return cb(err);
    cb(null, games.games);
  })
}

//find all inactive games
exports.findActiveGames = (cb) => {
  GameModel.find({isActive: false}, (err, games) => {
    if (err) return cb(err);
    cb(null, games.games);
  })
}

//find a game by id
exports.findGame = (id, cb) => {
  GameModel.findById(id, (err, game) => {
    if (err) return cb(err);
    cb(null, game);
  })
}
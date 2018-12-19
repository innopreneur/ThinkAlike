const scheduler = require('../core/scheduler.js');
const gameModel = require('../models/GameModel.js');
const voteModel = require('../models/VoteModel.js');
let { handleError } = require('./errorHandler');
const {compress, decompress} = require('object-compressor');

// validate the game scheduling request
exports.validateScheduleGameReq  = (req, res, next) => {
  console.log(Date.now() + " : validating request...");

  if(req.body.question === undefined ||
      req.body.options === undefined ||
      req.body.expiry === undefined ||
      req.body.stake === undefined ||
      req.body.createdOn === undefined 
      ){
        //res.status(400).json(`{error: Bad Request}`);
  }
  next();
}

//schedule the game
exports.scheduleGame = (req, res, next) => {
  let gameIntervalId = scheduler.scheduleGame(req.body);
  res.locals.intervalId = compress(gameIntervalId);
  next();
}

//save scehduled game in Database
exports.saveScheduledGameInDB = (req, res, next) => {
  gameModel.saveNewGame(req.body, (err, game) => {
    if(err) return handleError(err, res, next);
    console.log('Game saved succesfully' + JSON.stringify(game));
    req.game = game;
    next();
  });  
}

//create votes for this game in Database
exports.createVotesForGameInDB = (req, res, next) => {
  let newVotes = {};
  //set game id
  newVotes.gameId = req.game['_id'];
  //set count = 1 (if initiator staked this game)
  newVotes.votes = [];
  //add initial vote to votes
  newVotes.votes.push({
    address: req.body.creator.address,
    vote: req.body.creator.vote,
    stake: req.body.creator.stake
  })

  //create new votes entry for given game
  voteModel.createNewVoteForGame(newVotes, (err, vote) => {
    if(err) return handleError(err, res, next);
    console.log('Vote created succesfully' + JSON.stringify(vote));
    next();
  });  
}

//register vote for a given game
exports.registerVoteInDB = (req, res, next) => {
  let vote = req.body;
  //find the vote for a given game
  voteModel.registerVote(vote, (err, registeredVote) => {
    if(err) return handleError(err, res, next);
    res.locals.votes = registeredVote;
    next();
  })
  
}

//get all games
exports.findAllGames = (req, res, next) => {
  gameModel.findAllGames(req.query || {}, (err, games) => {
    if(err) return handleError(err, res, next);
    console.log(games)
    console.log("Expiry - " + new Date(games.expiry).getTime())
    let expiryInMin = ((new Date(games.expiry).getTime()) - Date.now())/60;
    console.log("Expiry in min = "+ expiryInMin)
    res.locals.games = games;
    next();
  });
}

//get all active games
exports.findActiveGames = (req, res, next) => {
  gameModel.findActiveGames((err, activeGames) => {
    if(err) return handleError(err, res, next);
    res.locals.activeGames = activeGames;
    next();
  });
}

//get all inactive games
exports.findInactiveGames = (req, res, next) => {
  gameModel.findActiveGames((err, inActiveGames) => {
    if(err) return handleError(err, res, next);
    res.locals.inActiveGames = inActiveGames;
    next();
  });
}


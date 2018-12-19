const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController.js');

let {validateScheduleGameReq,
    saveScheduledGameInDB,
    findAllGames,
    findActiveGames,
    findInactiveGames,
    createVotesForGameInDB,
    registerVoteInDB
   } = gameController;

// handle game schedule request
router.post('/game', [validateScheduleGameReq, saveScheduledGameInDB, createVotesForGameInDB], function (req, res, next) {
  res.status(200).json(`{message: Game scheduled successfully}`);
})

// handle game schedule request
router.get('/games', findAllGames, function (req, res) {
  res.status(200).json(req.res.locals.games);
})

// handle game schedule request
router.get('/activeGames', findActiveGames, function (req, res) {
  res.status(200).json(`{activeGames : ${req.res.locals.activeGames}}`);
})
// handle game schedule request
router.get('/inactiveGames', findInactiveGames, function (req, res) {
  res.status(200).json(`{inactiveGames :  ${req.res.locals.inactiveGames}}`);
})

// handle game schedule request
router.put('/vote', registerVoteInDB, function (req, res) {
  res.status(200).json(`{voted : ${req.res.locals.votes}}`);
})

module.exports = router;

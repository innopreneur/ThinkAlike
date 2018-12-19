const mongoose = require('mongoose');
const voteSchema =  require('../schemas/VoteSchema').VoteSchema;

let VoteModel = mongoose.model('votes', voteSchema); 

//save new vote
exports.createNewVoteForGame = (newVote, cb) => {
    let vote = new VoteModel(newVote);
    vote.save((err, data) => {
        if (err) return cb(err);
        cb(null, data);
      });
  }

//find vote by game id
exports.findVote = (gameId, cb) => {
    VoteModel.findOne({gameId}, (err, vote) => {
      if (err) return cb(err);
      cb(null, vote);
    })
}

//register Vote for a given game
exports.registerVote = (voteToRegister, cb) => {
    VoteModel.findOneAndUpdate({gameId: voteToRegister.gameId}, 
        {$push: {votes: voteToRegister.data}, $inc: {count : 1}}, 
        (err, registeredVote) => {
            if (err) return cb(err);
            cb(null, registeredVote);
    });
}
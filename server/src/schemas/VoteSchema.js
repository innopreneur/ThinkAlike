const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.VoteSchema = new Schema(
  {
    gameId: {type: String, required: true},
    count: {type: Number, required: false, default: 1},
    votes: [
        { 
            address: String,
            vote: Number,
            stake: {type: Number, default: 0}
        }
    ]
  }
);

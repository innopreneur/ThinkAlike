const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.GameSchema = new Schema(
  {
    games : [{
    question: {type: String, required: true},
    options: {type: Object, required: true},
    isActive: {type: Boolean, required: true},
    expiry: {type: Date, required: true},
    createdOn: {type: Date, required: true},
    votes: {type: Number, required: true},
    value: {type: Number, required: true},
    creator: {
      address: {type: String, required: true},
      vote: {type: Number, required:  true},
      stake: {type: Number, required: true}
    }
  }]
});

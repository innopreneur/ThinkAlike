var mongoose = require('mongoose');

//TODO- use proper self-hosted prod mongoDB
//current online mongo instance is only for testing and limited in size
//and import it from seperate config file or keystore
mongoose.connect('mongodb://localhost:27017/thinkalike');

module.exports = mongoose.connection;

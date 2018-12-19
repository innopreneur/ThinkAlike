var forever = require('forever-monitor');
var config = require('./forever-config');

  var child = new (forever.Monitor)('./index.js');

  child.on('watch:restart', function(info) {
      console.error('Restaring script because ' + info.file + ' changed');
  });

  child.on('restart', function() {
      console.error('Forever restarting script for ' + child.times + ' time');
  });
  
  child.on('exit', function () {
    console.log('Scheduler.js has exited after 3 restarts');
  });

  child.start();

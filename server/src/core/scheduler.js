const schedule = require('node-schedule');
//TODO support minutes, hours and days
//TODO use proper scheduler
//TODO scheduled game name should be unique (maybe userId + Game Name)

//cronString = second,minute,hour,dayOfMonth,month,dayOfWeek
//(e.g.) 0,0,
let generateCronPattern = (cronJson) => {

  let rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = cronJson.dayOfWeek.slice() || null;
  rule.hour = cronJson.hour || null;
  rule.minute = cronJson.minute || null;
  rule.second = 0;

  return rule;
}
exports.scheduleGame = (game) => {
/*  return setInterval(function(){
    publishScheduledGame(game);
  }, game.interval); */
  let expiry = new Date(game.expiry);
  console.log("Expiry date  : " +  expiry)
  return schedule.scheduleJob(expiry, function(){
    //schedule logic here
    console.log(`Game ${game.id} Expired`);
  });

}

exports.cancelScheduledGame = (gameToCancel) => {
  gameToCancel.scheduledGame.cancel();
  console.log(`Game ${id} cancelled`);
}

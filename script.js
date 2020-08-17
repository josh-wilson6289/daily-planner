$(document).ready(function(){

  var day = moment().format('LL');
  var currentTime = moment().format('LT');
  var currentHour = moment().format('H');
  var timeblocksContainer = $("#timeblocks");

  $("#currentDay").text(day);

for (var i = 9; i <= 17 ; i++) {
  var plannerRow = $("<div>");
  $("#timeblocks").append("<div class=row></div>");

}



});
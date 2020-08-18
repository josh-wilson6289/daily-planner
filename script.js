$(document).ready(function(){

  var day = moment().format('LL');
  var currentTime = moment().format('LT');
  var currentHour = moment().format('H');
  var timeblocksContainer = $("#timeblocks");

  // displays current day at the top of the screen
  $("#currentDay").text(day);

  // creates blocks from 9 am to 5 pm
  for (var hour = 9; hour <=17; hour++) {
    var newRow = $("<div>");
    var newTimeBlock = $("<p>");
    var newDescription = $("<p>");

    $(newRow).addClass("row");
    $(newTimeBlock).addClass("time-block col-1");
    $(newDescription).addClass("description col-11");

    if (hour < 12){
      $(newTimeBlock).text(hour + " am");
    }
    else if (hour === 12) {
      $(newTimeBlock).text(hour + " pm");
    }
    else {
      $(newTimeBlock).text((hour - 12) + " pm");
    }

    $(newDescription).text("")

    $(timeblocksContainer).append(newRow);
    $(newRow).append(newTimeBlock);
    $(newRow).append(newDescription);
  }

});

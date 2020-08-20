$(document).ready(function () {

  var currentDay = moment().format('LL');
  var currentHour = moment().format('H');
  var timeblocksContainer = $("#timeblocks");
  var rowHourValue;
  var newEvent;
  
  // checks local storage for stored events
  var storedEvents = JSON.parse(localStorage.getItem("newEvent"));

  // sets stored events to an empty array if not present or if not the current day
  if (storedEvents == null) {
    storedEvents = [];
  }
   
  // displays current day at the top of the screen
  $("#currentDay").text(currentDay);

  // creates blocks from 9 am to 5 pm
  for (hour = 9; hour <= 17; hour++) {
    var newRow = $("<div>");
    var newTimeBlockContainer = $("<div>");
    var newTimeBlock = $("<p>");
    var eventContainer = $("<div>");
    var displayEvent = $("<p>");

    // adds necessary classes to each block
    $(newRow).addClass("row");
    $(newTimeBlockContainer).addClass("time-block container-fluid col-1");
    $(newTimeBlock).addClass("time")
    $(eventContainer).addClass("description-container container-fluid col-11")
    $(displayEvent).addClass("description");

    // adds data attributes to be able to target modal
    $(newRow).attr('toggle', 'modal');
    $(newRow).attr('target', '#myModal');
    $(newTimeBlockContainer).attr('toggle', 'modal');
    $(newTimeBlockContainer).attr('target', '#myModal');

    // creates each block an hour data attribute for the row and displaying events
    $(newRow).attr("data-hour", hour);
    $(displayEvent).attr("id", hour);

    // checks what background color should be for each row and gives it the appropriate class
    if (currentHour < hour) {
      $(eventContainer).addClass("future");
    }
    else if (currentHour == hour) {
      $(eventContainer).addClass("present");
    }
    else {
      $(eventContainer).addClass("past");
    }

    // formats to am and pm
    if (hour < 12) {
      $(newTimeBlock).text(hour + " am");
    }
    else if (hour === 12) {
      $(newTimeBlock).text(hour + " pm");
    }
    else {
      $(newTimeBlock).text((hour - 12) + " pm");
    }
    // loops through local storage to check if there is a description to display for given hour block
    for (var i = 0; i < storedEvents.length; i++) {
      if (storedEvents[i].eventHour === hour) {
        $(displayEvent).text(storedEvents[i].eventDescription);
        break;
      }
      else {
        $(displayEvent).text("");
      }
    }

    // append elements
    $(timeblocksContainer).append(newRow);
    $(newRow).append(newTimeBlockContainer);
    $(newTimeBlockContainer).append(newTimeBlock);
    $(newRow).append(eventContainer);
    $(eventContainer).append(displayEvent);
  }

  // click events to trigger modal
  $(".row").click(function () {

    // grabs the hour value for the particular row clicked
    rowHourValue = $(this).data("hour");

    // shows modal
    $('#myModal').modal('show');
  });

  // click event to save the userInput and rowHourValue for the new event
  $(".btn-primary").click(function () {
    event.preventDefault();

    // gets the value of the textarea in the modal
    var userInput = $("textarea").val();

    // concatinates the row hour value to the blank id created in line 43.  Adds the userInput text.
    $("#" + rowHourValue).text(userInput);

    // clears text area and modal
    $("textarea").val("");
    $('#myModal').modal('hide');

    // create object to send to local storate
    newEvent = {
      "eventHour": rowHourValue,
      "eventDescription": userInput
    };

    // checks to see if there is already an event for the particular time.  If so, it replaces it with the latest event.
    localStorage.setItem("newEvent", JSON.stringify(newEvent));
    for (var i = 0; i < storedEvents.length; i++) {
      if (storedEvents[i].eventHour === rowHourValue) {
        storedEvents.splice(i, 1);
        i--;
      }
    }
    storedEvents.push(newEvent);
    localStorage.setItem("newEvent", JSON.stringify(storedEvents));

  })
});



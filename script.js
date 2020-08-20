$(document).ready(function(){

  var day = moment().format('LL');
  var currentHour = moment().format('H');
  var timeblocksContainer = $("#timeblocks");
  var rowHourValue;
  var newEvent;
  
  // checks local storage for stored events
  var storedEvents = JSON.parse(localStorage.getItem("newEvent"));
  
  if (storedEvents == null) {
    storedEvents = [];
  }

  // displays current day at the top of the screen
  $("#currentDay").text(day);

  // creates blocks from 9 am to 5 pm
  for (hour = 9; hour <=17; hour++) {
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
    
    // creates data attributes for rows and events
    $(newRow).attr("data-hour", hour);
    $(displayEvent).attr("id", hour);
    
    // checks what background color should be for each row
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
      // creates space for event description
    

      for (var i=0; i < storedEvents.length; i++) {
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
  $(".row").click(function(){
    rowHourValue = $(this).data("hour");
    $('#myModal').modal('show');
  });

  // click event to save the userInput and rowHourValue for the new event
  $(".btn-primary").click(function(){
    event.preventDefault();
    var userInput = $("textarea").val();
    
    $("#" + rowHourValue).text(userInput);
    $("textarea").val("");
    $('#myModal').modal('hide');

    newEvent = {
      "eventHour": rowHourValue,
      "eventDescription": userInput
    };
      
    localStorage.setItem("newEvent", JSON.stringify(newEvent));
    storedEvents.push(newEvent);
    localStorage.setItem("newEvent", JSON.stringify(storedEvents));
    
  })  
});



$(document).ready(function(){

  var day = moment().format('LL');
  var currentHour = moment().format('H');
  var timeblocksContainer = $("#timeblocks");


  // displays current day at the top of the screen
  $("#currentDay").text(day);

  // creates blocks from 9 am to 5 pm
  for (var hour = 9; hour <=17; hour++) {
    var newRow = $("<div>");
    var newTimeBlockContainer = $("<div>");
    var newTimeBlock = $("<p>");
    var descriptionContainer = $("<div>")
    var newDescription = $("<p>");
    var newSaveButton = $("<div>");

    $(newRow).addClass("row");
    $(newTimeBlockContainer).addClass("time-block col-1");
    $(newTimeBlock).addClass("time")
    $(descriptionContainer).addClass("description-container col-10")
    $(newDescription).addClass("description");
    $(newSaveButton).addClass("saveBtn col-1");

    // checks what background color should be for each row
    if (currentHour < hour) {
      $(descriptionContainer).addClass("future");
    }
    else if (currentHour == hour) {
      $(descriptionContainer).addClass("present");
    }
    else {
      $(descriptionContainer).addClass("past");
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
    $(newDescription).text("Description");
    
    // creates save button text
    $(newSaveButton).text("Save");

    // append elements
    $(timeblocksContainer).append(newRow);
    $(newRow).append(newTimeBlockContainer);
    $(newTimeBlockContainer).append(newTimeBlock);
    $(newRow).append(descriptionContainer);
    $(descriptionContainer).append(newDescription);
    $(newRow).append(newSaveButton);
  }

  // click events to add event when description or time block is clicked
  $(".description-container").on("click", function(){
    console.log("description container clicked");
  });

  $(".time-block").on("click", function(){
    console.log("time block clicked");
  });

  // click event for save button
  $(".saveBtn").on("click", function(){
    console.log("save button clicked");
  });

});


  
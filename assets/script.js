$(document).ready(function () {
  // Display current date and time
  let now = dayjs();
  let displayDate = now.format("dddd, MMMM D");
  $("#currentDay").text(displayDate);

  // Update time slot colors based on current time
  const updateTimeSlotColors = function () {
    var currentTime = parseInt(dayjs().format("H"));

    $(".time-block").each(function () {
      let hour = parseInt($(this).attr("id").replace("hour", ""));
      let textArea = $(this).children(".description");
      let saveBtn = $(this).children(".saveBtn");

      if (hour < currentTime) {
        textArea.addClass("past");
      } else if (hour === currentTime) {
        textArea.removeClass("past");
        textArea.addClass("present");
      } else {
        textArea.removeClass("past");
        textArea.removeClass("present");
        textArea.addClass("future");
      }
    });
  };

  updateTimeSlotColors();

  // Save text to local storage
  $(".saveBtn").on("click", function () {
    let text = $(this).siblings(".description").val();
    let time = $(this).parent().attr("id");

    localStorage.setItem(time, text);
  });

  // Load text from local storage
  $(".time-block").each(function () {
    let time = $(this).attr("id");
    let text = localStorage.getItem(time);
 

    $(this).children(".description").val(text);
  });

  // Update time slot colors every minute
  setInterval(updateTimeSlotColors, 60000);
});


   
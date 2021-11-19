$(document).ready(function() {
  //track inputs and update counter
  //update color and handle negative numbers when character limit is passed
  $('textarea').on("input", function() {
    let countLength = 140 - $.trim($(this).val().length);
    if (countLength >= 0) {
      $(".counter").text(countLength);
    }
    if (countLength < 0) {
      $(".counter").text(countLength);
      $(".counter").css('color', 'red');
    } else {
      $(".counter").css('color', '#545149');
    }
  });
});
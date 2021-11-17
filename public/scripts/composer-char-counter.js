//Update the counter and change colors
$(document).ready(function() {
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
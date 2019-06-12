$(document).ready(function() {
  //targets the textarea in the new-tweet class on input and updates the counter to reflect the number of characters remaining. If the number of characters entered is greater than 140, it toggles the red class on the counter.
  $(".new-tweet textarea").on("input", function() {
    const counter = $(this).parent().children(".counter");
    const textareaLength = $(this).val().length;
    counter.text(140 - textareaLength);
    if(textareaLength > 140){
      counter.addClass("red");
    } else {
      counter.removeClass("red");
    }
  })
});
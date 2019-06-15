/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  //toggle compose tweet section
  $('.toggle-button').click(function() {
    $('.new-tweet').slideToggle(function(){
      $('.form textarea').select();
    });
  });

  $('.form').on('submit', createAndAppendTweet);

  //hide error when input detected
  $('.new-tweet textarea').on("input", function() {
    $(this).parent().children("p").hide();
  })
  
  loadTweets();

});

//get tweets request handler
function loadTweets () {
  $.ajax({
    type: 'GET',
    url: '/tweets/',
    dataType: 'json',
    success: function(res){
      renderTweets(res);
    }
  })
}

//Callback function to #form on submit, creates a new 
function createAndAppendTweet (event) {
  event.preventDefault();
  if(!validateForm()){
    return false;
  }

  $.ajax('/tweets/', { method: 'POST', data: $(this).serialize() })
  .then((newTweet) => {
    $('#tweet-container').prepend(createTweetElement(newTweet));
    this.reset();
    $(this).parent().children(".new-tweet .counter").text("140");
  });
}

//checks the textarea input for falsey values and restricts tweet to 140 characters
function validateForm () {
  let formValue = $('.form textarea').val();
  if(!formValue){
    $('.new-tweet p').text("You cannot tweet an empty tweet").show();
    return false;
  };
  if(formValue.length > 140){
    $('.new-tweet p').text("Please limit your tweet to 140 characters").show();
    return false;
  }
  return true;
}

//outputs the time since the tweet was created taking a UNIX timestamp from the tweet as input
function convertTimestamp (date) {
  const ms = Date.now() - date;
  const seconds = Math.round((ms / 1000));
  const minutes = Math.round((ms / (1000 * 60)));
  const hours = Math.round((ms / (1000 * 60 * 60)));
  const days = Math.round((ms / (1000 * 60 * 60 * 24)));
  
  if(seconds < 5) {
    return "Just now";
  }
  if(seconds < 60) {
    return seconds + " seconds ago"
  }
  if(minutes < 60) {
    return minutes + " minutes ago";
  }
  if (hours < 24) {
    return hours + " hours ago";
  }
  if (days < 30) {
    return days + " days ago";
  }
  return "Over a month ago";
}

//creates tweet element and adds it to the DOM
function createTweetElement (tweet) {
  const article = $("<article>").addClass('tweet');
  const header = $("<header>");
  const img = $("<img>").attr("src", tweet.user.avatars.regular).attr("alt", "avatar");
  const h3 = $('<h3>').text(tweet.user.name);
  const span = $('<span>').text(tweet.user.handle).addClass('handle');
  const content = $('<p>').text(tweet.content.text);
  const footer = $('<footer>');
  const timestamp = $('<p>').text(convertTimestamp(tweet.created_at));
  const icons = $('<span>').addClass("icons");
  const flag = $('<i>').addClass("fa fa-flag").attr('aria-hidden', "true");
  const retweet = $('<i>').addClass("fa fa-retweet").attr('aria-hidden', "true");
  const heart = $('<i>').addClass("fa fa-heart").attr('aria-hidden', "true");
  
  return article.append(
    header.append(img, h3, span), 
    content, 
    footer.append(timestamp, icons.append(flag, retweet, heart)));
}

//creates the tweet and appends it to the tweet-container
function renderTweets (tweetArr) {
  tweetArr.forEach(element => {
    $('#tweet-container').append(createTweetElement(element));
  });
}
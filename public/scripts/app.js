/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

    //gets the time since the tweet was created taking a UNIX timestamp from the tweet as input
    function convertTimestampIntoDays (date) {
      const minutes = Math.round((Date.now() - date) / (1000 * 60));
      const hours = Math.round((Date.now() - date) / (1000 * 60 * 60));
      const days = Math.round((Date.now() - date) / (1000 * 60 * 60 * 24));
      if(minutes < 60) {
        return minutes + " minutes";
      }
      if (hours < 24) {
        return hours + " hours";
      }
      if (days < 30) {
        return days + " days";
      }
      return 'Over a month';
    }

    //creates tweet element and adds it to the DOM
    function createTweetElement (tweet) {
      return $(`
        <article class="tweet">
          <header>
            <img src="${tweet.user.avatars.regular}" alt="avatar">
            <h3>${tweet.user.name}</h3>
            <span class="handle">${tweet.user.handle}</span>
          </header>
          <p>${tweet.content.text}</p>
          <footer>
            <p>${convertTimestampIntoDays(tweet.created_at)} ago</p>
            <span class="icons">
              <i class="fa fa-flag" aria-hidden="true"></i>
              <i class="fa fa-retweet" aria-hidden="true"></i>
              <i class="fa fa-heart" aria-hidden="true"></i>
            </span>
          </footer>
        </article>
      `)
    }
    
    function renderTweets (tweetArr) {
      tweetArr.forEach(element => {
        $('#tweet-container').append(createTweetElement(element));
      });
    }

    //Ajax request
    $(function() {
      var form = $('#form');
      form.on('submit', function () {
        event.preventDefault();
        console.log('Form submitted, performing ajax call...');
        console.log($(this).serialize());
        $.ajax('/tweets/', { method: 'POST', data: $(this).serialize() })
        .then((newTweet) => {
          console.log('Success: ', newTweet);
          $('#tweet-container').prepend(createTweetElement(newTweet));
        });
      });
    });

    $.ajax({
      type: 'GET',
      url: '/tweets/',
      dataType: 'json',
      success: function(res){
        //if request made successfully
        console.log(res);
        console.log("This is the AJAX GET request!!!");
        $('#tweet-container').prepend(renderTweets(res));
      }
    })
  });
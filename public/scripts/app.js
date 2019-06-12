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
  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }

  var $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('#tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});
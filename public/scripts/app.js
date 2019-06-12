/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // Test / driver code (temporary). Eventually will get this from the server.
  // Fake data taken from tweets.json
  const data = [
    {
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
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
        "content": {
          "text": "Je pense , donc je suis"
        },
        "created_at": 1461113959088
      },
      {
        "user": {
          "name": "Johann von Goethe",
          "avatars": {
            "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
            "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
            "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
          },
          "handle": "@johann49"
        },
        "content": {
          "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
        },
        "created_at": 1461113796368
      }
    ];

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
    
    var $tweets = renderTweets(data);
    // Test / driver code (temporary)
    console.log($tweets); // to see what it looks like
    
    function renderTweets (tweetArr) {
      tweetArr.forEach(element => {
        $('#tweet-container').append(createTweetElement(element));
      });
    }
  });
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
const createTweetElement = function(obj) {

  const $tweet = $(
  `<article class="tweet">
  <header>
      <div id="user">
        <img src=${tweetData["user"]["avatars"]}/>
        <h5>${tweetData["user"]["name"]}</h5>
      </div>
      <h5 id="handle">${tweetData["user"]["handle"]}</h5>
    </header>
  <p>${tweetData["content"]["text"]}</p>
  <footer>
      <p>${tweetData["created_at"]}</p>
      <div id="icons">
        <i class="fa-solid fa-flag fa-2xs"></i>
        <i class="fa-solid fa-retweet fa-2xs"></i>
        <i class="fa-solid fa-heart fa-2xs"></i>
      </div>
    </footer>
  </article>`);

  return $tweet;
}

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('.tweet-container').append($tweet);

});
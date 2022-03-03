/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const $submit = $('.tweet-form');
    
  $submit.submit(function(event) {
    event.preventDefault();
    console.log('Button clicked, performing ajax call...');
    const $tweetInput = $(this).serialize();
    $.ajax({
      url: '/tweets/', 
      method: 'POST',
      data: $tweetInput 
    })
    .then(function(data){
      console.log(this.data);
    })
    .catch(function(error){
      console.log(`Error: ${error}`);
    });
  });

  const createTweetElement = function(data) {

    let $tweet = $(
    `<article class="tweet">
    <header>
        <div id="user">
          <img src=${data["user"]["avatars"]}/>
          <h5>${data["user"]["name"]}</h5>
        </div>
        <h5 id="handle">${data["user"]["handle"]}</h5>
      </header>
    <p>${data["content"]["text"]}</p>
    <footer>
        <p>${timeago.format(data["created_at"])}</p>
        <div id="icons">
          <i class="fa-solid fa-flag fa-2xs"></i>
          <i class="fa-solid fa-retweet fa-2xs"></i>
          <i class="fa-solid fa-heart fa-2xs"></i>
        </div>
      </footer>
    </article>`);
    return $tweet;
  }

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      let $newTweet = createTweetElement(tweet);
      $('.tweet-container').append($newTweet);
    }
  }

  const loadTweets = function() {
    $.ajax({
      dataType: "json", 
      url: '/tweets/',
      method: 'GET', 
    })
    .then(function(data){
      renderTweets(data);
    })
    .catch(function(error){
      console.log(`Error: ${error}`);
    });
  }
  loadTweets();

});
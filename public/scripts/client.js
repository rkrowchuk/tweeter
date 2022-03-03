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
    const $input = this.text.value;
    if ($input === "") {
      alert("Error: your tweet is too short");
    } else if ($input.length > 140) {
      alert("Error: your tweet is too long");
    } else {
      const $tweetInput = $(this).serialize();
      $.ajax({
        url: '/tweets/', 
        method: 'POST',
        data: $tweetInput 
      })
      .then(function(){
        location.reload();
      })
      .catch(function(error){
        alert(`Your tweet didn't work`);
      });
    }
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
    for (let i = tweets.length - 1; i >= 0; i--) {
      let $newTweet = createTweetElement(tweets[i]);
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
    })
  };

  loadTweets();

});
$(document).ready(function() {

  const $container = $('.tweet-container');
  const $submit = $('.tweet-form');
  const $scrollBtn = $('#scroll-to-top');
  const $tweetForm = $('.new-tweet');
  const $textArea = $("#tweet-text");
  const $errorMsg = $('#error-msg');

  // Loads all rendered tweets
  const loadTweets = function() {
    $.ajax({
      dataType: "json",
      url: '/tweets/',
      method: 'GET',
    })
      .then(function(data) {
        $container.empty();
        renderTweets(data);
      })
      .catch(function(error) {
        console.log(`Error: ${error}`);
      });
  };

  loadTweets();

  // creates the layout of an indiviual tweet
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
  };

  // renders the database of tweets
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const $newTweet = createTweetElement(tweet);
      $container.prepend($newTweet);
    }
  };

  // gives focus/visibility of tweet form when compose button is clicked
  $('#compose').on('click', function() {
    $tweetForm.is(':visible') ? $tweetForm.slideUp() : $tweetForm.slideDown(); 
    $textArea.focus();
  });

  // scrolls page to top
  $scrollBtn.on('click', function() {
    document.documentElement.scrollTop = 0;
    $scrollBtn.fadeOut(1000);
  });
  
  $(window).on('scroll', function() {
    $scrollBtn.css("display", "inline");
  });
 
  // post request for new tweet
  $submit.on('submit', function(event) {
    event.preventDefault();
    $textArea.text();
    console.log('Button clicked, performing ajax call...');
    const $tweetInput = $(this).serialize();
    const $input = this.text.value;
    if ($input === "" || $input.length > 140) {
      $errorMsg.slideDown();
      $textArea.focus(function() {
        $errorMsg.slideUp();
      });
    } else {
      $.ajax({
        url: '/tweets/',
        method: 'POST',
        data: $tweetInput
      })
        .then(function() {
          $textArea.val('');
          $('.counter').val('140');
          loadTweets();
        })
        .catch(function(error) {
          $errorMsg.slideDown();
          $textArea.focus(function() {
            $errorMsg.slideUp();
          });
        });
    }
  });

});
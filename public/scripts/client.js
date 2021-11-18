/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for(let tweetData of tweets) {
    //console.log(tweetData);
    let $tweetElement = createTweetElement(tweetData);
    $(`.tweet-container`).append($tweetElement);
  }
}
createTweetElement = (tweetData) => {
let article = `<article class = "tweet">
                <header>
                  <div class="avatar-name-container">
                    <div class="tweeter-avatar">
                      <img src=${tweetData.user.avatars} id="avatar-icon" alt="">   
                    </div>
                    <div class="tweeter-name">
                      <p>${tweetData.user.name}</p>
                    </div>
                  </div>
                  <div class="tweeter-handle">
                    <h3>${tweetData.user.handle}</h3>
                  </div>
                </header>
                <div class="tweeter-posts">
                  <p>${tweetData.content.text}</p>
                </div>
                <footer>
                  <div class ="time-posted">
                      <p>${tweetData.created_at}</p>
                  </div>
                  <div class ="footer-icons">
                    <i class="fas fa-flag"></i>
                    <i class="fas fa-retweet"></i>
                    <i class="fas fa-heart"></i>
                  </div>
                </footer>
              </article>`
  
  return article;
}


$(document).ready(function() {
  const loadTweets = () => {
    $.get('/tweets/', function(data) {
      renderTweets(data);
      console.log(data);
    });
  }
  loadTweets();
    $('#form-submit').submit(function(event) {
    //alert( "Handler for .submit() called." );
    const text = $('form').serialize();
    //const textLength = text.length - 5; //minus 5 characters for "text="
    //console.log(text);
    $.post('/tweets', text, function () {
      console.log(text);
      //once you post a tweet, get that post back and display it
    });
    //reset textarea after submitting
    //reset counter after submitting
    event.preventDefault();

  });
});

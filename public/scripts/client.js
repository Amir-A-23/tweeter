/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = tweets => {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and prepend it to the tweets container
  for (let tweetData of tweets) {
    let $tweetElement = createTweetElement(tweetData);
    $(`.tweet-container`).prepend($tweetElement);
  }
};

//get last tweet added to tweet DB
//use prepend to add to top of tweet-container
const renderLatestTweet = tweets => {
  const latestTweet = tweets[tweets.length - 1];
  let $tweetElement = createTweetElement(latestTweet);
  $(`.tweet-container`).prepend($tweetElement);
};
const createTweetElement = tweetData => {
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
               
                  <p class="overflow-wrap">${escape(tweetData.content.text)}</p>
                </div>
                <footer>
                  <div class ="time-posted">
                      <p>${timeago.format(tweetData.created_at)}</p>
                  </div>
                  <div class ="footer-icons">
                    <i class="fas fa-flag"></i>
                    <i class="fas fa-retweet"></i>
                    <i class="fas fa-heart"></i>
                  </div>
                </footer>
              </article>`;
  
  return article;
};


$(document).ready(() => {
  
  loadTweets();

  $('#form-submit').submit((event) => {
    const formData = $('form').serialize();
    const text = getText(formData);

    //Error Handling if form is empty or spaces
    if (!errorhandle(text)) {
      $('.error-message').hide();

      $.post('/tweets', formData, function() {
        
        //once you post a tweet, get that post back and display it
        loadLatestTweet();
        //reset textarea after submitting
        $('textarea').val("");
        //reset counter after submitting
        resetCounter();

      });
    }

    event.preventDefault();

  });
});


//Check for edge cases
const errorhandle = text => {
  if (!text || !text.trim()) {
    $('.error-message').text('Error: Tweet is empty');
    $('.error-message').show();
    return true;
  }
  if (text.length > 140) {
    $('.error-message').text('Error: Exceeded Character Limit');
    $('.error-message').show();
    return true;
  }
  return false;
};



//GET request get the initial tweets to load on main page
const loadTweets = () => {
  $.get('/tweets/', function(data) {
    renderTweets(data);
  });
};

//GET request to get the latest tweet user submits
const loadLatestTweet = () => {
  $.get('/tweets/', function(data) {
    renderLatestTweet(data);
  });
};

//remove the first 5 characters which are 'text=' from the form data
getText = formData => {
  let text = '';
  for (let chars in formData) {
    if (chars > 4) {
      text += formData[chars];
    }
  }
  return text;
};


//reset after submission
const resetCounter = () => {
  $('.counter').text(140);
  $(".counter").css('color', '#545149');
};

//handle XSS
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
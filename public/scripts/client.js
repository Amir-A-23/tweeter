/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = tweets => {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and prepend it to the tweets container
  for(let tweetData of tweets) {
    let $tweetElement = createTweetElement(tweetData);
    $(`.tweet-container`).prepend($tweetElement);
  }
};
const renderLatestTweet = tweets => {
    const latestTweet = tweets[tweets.length - 1];
    let $tweetElement = createTweetElement(latestTweet);
    $(`.tweet-container`).prepend($tweetElement);
};
createTweetElement = tweetData => {
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
                      <p>${timeago.format(tweetData.created_at)}</p>
                  </div>
                  <div class ="footer-icons">
                    <i class="fas fa-flag"></i>
                    <i class="fas fa-retweet"></i>
                    <i class="fas fa-heart"></i>
                  </div>
                </footer>
              </article>`
  
  return article;
};


$(document).ready(() => {

  loadTweets();
    
    $('#form-submit').submit((event) => {
    const formData = $('form').serialize();
    const text = getText(formData);
    if(!text || !text.trim()) {
      alert('Error: Tweet is empty');
    } else if(text.length > 140){
      alert('Error: Exceeded Character Limit');
    } else {
    $.post('/tweets', formData, function () {

      //once you post a tweet, get that post back and display it
      loadLatestTweet();

      //reset textarea after submitting
    $('textarea').val("");
    });
    }
    
    //reset counter after submitting
    $('.counter').text(140);
    $(".counter").css('color', '#545149');

    event.preventDefault();

  });
});
// errorhandle = text => {
//   if(!text || !text.trim()) {
//      alert('Error: Tweet is empty');
//      return true;
//   } 
//   if(text.length > 140){
//      alert('Error: Exceeded Character Limit');
//      return true;
//   }
//   return ;
// }


loadTweets = () => {
  $.get('/tweets/', function(data) {
    renderTweets(data);
  });
};

loadLatestTweet = () => {
  $.get('/tweets/', function(data) {
    renderLatestTweet(data);
  });
}
getText = formData => {
  let text = '';
  for(let chars in formData) {
    if(chars > 4) {
      text += formData[chars];
    }
  }
  return text;
};


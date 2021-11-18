/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
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
createTweetElement = (tweetData) => {
  return tweetData;

  //return tweet article element
}
const $tweet = createTweetElement(tweetData);



$(document).ready(function() { 
  $(document).submit(function(){
    console.log($tweet);
    $(`tweets-container`).append($tweet);
  });
});

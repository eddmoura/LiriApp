var fs = require('fs');
var keys = require('./keys.js');
// var spotify = require('spotify');
var twitter = require('twitter');

var request = require('request');

var spotify2 = require('node-spotify-api');

var action = process.argv[2];

var userinput = " ";
 for(i = 3; i < process.argv.length; i++){
  userinput += process.argv[i] + " ";
 }

userinput = userinput.trim();


switch(action){
  case 'my-tweets':
    mytweets();
    break;
  
  case 'spotify-this-song':
    songinfo();
    break;
  
  case 'movie-this':
    movieinfo();
    break;
  
  case 'do-what-it-says':         
    doWhatItSays();
    break;
}

function mytweets(){

var client = new twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

var params = {
  screen_name: 'edu_1982'
}


client.get('statuses/home_timeline', params, function(error, tweets, response) {
  
  if(error) throw error;   

  for (var i = 0; i < tweets.length; i++){

  console.log(tweets[i].created_at);
  console.log(tweets[i].text); 
  console.log(" "); 
  
}

});
};


function songinfo(pineapple ) {
  

  var spotify = new spotify2({
  id: 'f853f7a4d7a14c3ab224f260674d8f93',
  secret: '2b89577c57334c82b1b6ce60d744281d'
});
 // this if statment will check if the the user input is empty, if so the song assigned for this will be display.
 if (userinput === ""){
  userinput = "The Sign Ace of Base";
 }
   
spotify.search({ type: 'track', query: userinput }, function(err, data) {

 
  if (err) {
// return console.log('Error occurred: ' + err);
  }

 else if (!err) {
console.log("Artist: " + data.tracks.items[0].artists[0].name);
console.log("Song Name: " + data.tracks.items[0].name);
console.log("URL: " + data.tracks.items[0].preview_url); 
console.log("Album Name: " + data.tracks.items[0].album.name);

}

});

};

function movieinfo() {

  if(userinput == ""){
    userinput = "Mr.Nobody";
  }

  request("http://www.omdbapi.com/?t="+ userinput + "&y=&plot=short&apikey=40e9cece&tomatoes=true", function(error, response, body) {

 
  if (!error && response.statusCode === 200) {

  
    var parsed = JSON.parse(body);

    console.log("Title of the movie: " + parsed.Title);
    console.log("Released date: " + parsed.Year)
    console.log("The movie's rating is: " + parsed.imdbRating);
    console.log("Country: " + parsed.Country);
    console.log("Language: " + parsed.Language);
    console.log("Plot: " + parsed.Plot)
    console.log("Casting: " + parsed.Actors);
    console.log("Rotten Tomatoe URL: " + parsed.tomatoURL);
  }
});

}


function doWhatItSays(){
fs.readFile("random.txt", "utf-8", function read(err, data){
  
  if(err){

   return console.log(err);
  
  }

var dataArr = data.split(",");
// for(var i = 1; i < dataArr.length; i++)
songinfo(dataArr[1]);
//console.log(dataArr);
console.log(dataArr[1]);
});


};




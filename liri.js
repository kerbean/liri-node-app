/*

LIRI.JS - JS THAT HANDLES THE LOGIC FOR THE SPOTIFY CLI APP.

*/

var axios = require("axios");
var spot = require("node-spotify-api");
var fs = require("fs");
var moment = require("moment");
var keys = require("./keys");

//NEEDED FOR APPLYING SECRET KEY AND ID
var dotenv = require("dotenv").config();

var keys = require("./keys");
var spotify = new spot({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});
var input = process.argv.slice(3).join(" ");
var operation = process.argv[2];
moment().format();
//var command = process.argv[0] + " " + process.argv[1] + " " + process.argv[2] + " ";
var command = process.argv[2] + " ";
appendFileLogs(command, input);

//console.log("COMMAND : " + process.argv.slice(0).join(" "))
console.log("USER INPUT : " + input);

if (operation == "spotify-this-song") {
    spotify.search({ type: "track", query: input }).then(function (response) {
        let results = [
            "< = = = = = = = = = = = >", "",
            "Artist: " + response.tracks.items[0].album.artists[0].name,
            "Song: " + input,
            "spot Link: " + response.tracks.items[0].album.artists[0].external_urls.spotify,
            "Album: " + response.tracks.items[0].album.name, "",
            "< = = = = = = = = = = = >"
        ];
        console.log(results);
    })
        .catch(function (error) {
            console.log("PROBABLY NO RESULTS FOUND?! \n");
        });

} else if (operation == "concert-this") {
    let concertURL =
        "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
    axios.get(concertURL).then(function (response) {
        let results = [
            "< = = = = = = = = = = = >", "",
            "Artist: " + input,
            "Venue: " + response.data[0].venue.name,
            "Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region,
            "Date: " + moment(response.data[0].datetime).format("MM/DD/YYYY"), "",
            "< = = = = = = = = = = = >"
        ];
        console.log(results);

    })
        .catch(function (error) {
            console.log("PROBABLY NO RESULTS FOUND?! \n");
        });
} else if (operation == "movie-this") {
    axios.get("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy"
    ).then(function (response) {
        let results;
        if (response.data.Title == undefined) {
            results = "PROBABLY NO RESULTS EY?!";
        } else {
            results = [
                "< = = = = = = = = = = = >",
                "Title: " + response.data.Title,
                "Year: " + response.data.Year,
                "Rated: " + response.data.Rated,
                "Country: " + response.data.Country,
                "Language: " + response.data.Language,
                "Plot: " + response.data.Plot,
                "Actors: " + response.data.Actors,
                "< = = = = = = = = = = = >"
            ];
        }
        console.log(results);

    }).catch(function (error) {
        console.log("PROBABLY NO RESULTS FOUND?! \n");
    });

} else if (operation == "do-what-it-says") {
    fs.readFile("random.txt", "UTF-8", function (error, data) {
        if (error) {
            console.log("Error: " + error);
        } else {
            let choice = data.split(",");
            console.log(choice[1]);
            spotify.search({ type: "track", query: choice[1] }).then(function (response) {
                let data = response.tracks.items[0].album;
                let results = [
                    "< = = = = = = = = = = = >",
                    "Artist: " + data.artists[0].name,
                    "Song: " + choice[0],
                    "spot Link: " + data.artists[0].external_urls.spotify,
                    "\nAlbum: " + data.name,
                    "< = = = = = = = = = = = >"
                ];
                console.log(results);
            })
                .catch(function (error) {
                    console.log(error);
                });
        }
    });

} else {
    console.log("ENTER A VALID COMMAND");
}

function appendFileLogs(bread, cheese) {
    //fs.appendFile('logs.txt', bread + input + ",", function (err) {
    fs.appendFile('logs.txt', "node liri " + bread + input + ",", function (err) {
        if (err) throw err;
    });
}
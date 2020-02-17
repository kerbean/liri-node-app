/*

KEYS.JS - OBJECT WHICH RETURNS SPOTIFY ID AND SECRET KEY

*/

//console.log('START - INSIDE KEYS.JS');

exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};

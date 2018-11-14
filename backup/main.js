var dates = require('./randomDates');
var fs = require('fs');
var marvelResponse = [];
var randomComic;

//API Credentials
const publicKey = '7651919bd4d642048ee242960904a3ba';
var ts = 1541095973559;
var hash = 'e061c2b8e18d57de9b62cd6919cac5a6'
var credentials = "&apikey="+publicKey+"&ts="+ts+"&hash="+hash;

//API Endpoint
const url = 'http://gateway.marvel.com/v1/public/comics';

var dateRange = dates.getMarvelDates();
var dateString1 = dateRange[0].getFullYear() + "-" + dateRange[0].getMonth() + "-"+ dateRange[0].getDate();
var dateString2 = dateRange[1].getFullYear() + "-" + dateRange[1].getMonth() + "-"+ dates.daysInMonth(dateRange[1].getMonth());
console.log(dateString1);
console.log(dateString2);
console.log('Finding a random comic from between ' + dateString1 + ' & ' + dateString2 + ':');

var call = url+"?&limit=100&dateRange="+dateString1+","+dateString2+credentials;

//Http request
var request = new XMLHttpRequest();
request.open('GET',call, 'True');
request.onload = function(){
  //Get the API response
  var data = JSON.parse(this.response);
  console.log(data);

  data.data.results.forEach (result => {
      console.log(result.title + " (ID:" + result.id + " )");
  });


//Select one comic at random from those returned by API
  randomComic = data.data.results[Math.floor(Math.random() * data.data.results.length)];
  console.log(randomComic);
};
request.send();

//Marvel Time Machine Web App
//Makes use of the MArvel API to randomly select one comic from their archives
//and present cover art and key data


//Imports
var dates = require('./randomDates');
var htmlGen = require('./htmlGenerator');
var fs = require('fs');

//Important variables
var marvelResponse = []; //Stores the API response array
var randomComic; // Stores the randomly selsected comic to be presented

//API Endpoint
const url = 'http://gateway.marvel.com/v1/public/comics';

//API Credentials
const publicKey = '7651919bd4d642048ee242960904a3ba';
var ts = 1541095973559;
var hash = 'e061c2b8e18d57de9b62cd6919cac5a6'
var credentials = "&apikey="+publicKey+"&ts="+ts+"&hash="+hash;

var dateRange = dates.getMarvelDates();
var dateString1 = dateRange[0].getFullYear() + "-" + (dateRange[0].getMonth()+1) + "-"+ dateRange[0].getDate();
var dateString2 = dateRange[1].getFullYear() + "-" + (dateRange[1].getMonth()+1) + "-"+ dates.daysInMonth(dateRange[1].getMonth());
console.log('Finding a random comic from between ' + dateString1 + ' & ' + dateString2 + ':');

//Final API Call
var call = url+"?&limit=100&dateRange="+dateString1+","+dateString2+credentials;


//DOM Setup
const app = document.getElementById('root');
const doc = document;
app.appendChild(htmlGen.createLogoElement(doc));
const container = htmlGen.createContainer(doc);
app.appendChild(container);


//Http request
var request = new XMLHttpRequest();
request.open('GET',call, 'True');
request.onload = function(){
  //Get the API response
  var data = JSON.parse(this.response);
  console.log(data);

  //data.data.results.forEach (result => {
  //    console.log(result.title + " (ID:" + result.id + " )");
  //});


  //Select one comic at random from those returned by API
  randomComic = data.data.results[Math.floor(Math.random() * data.data.results.length)];
  console.log(randomComic);
  console.log('Title: ' + randomComic.title);

  //Setup html
  const card = document.createElement('div');
  card.setAttribute('class','card');

  //Get image
  const image = document.createElement('img');
  const imageUrl = randomComic.images[0].path + '.' + randomComic.images[0].extension;
  image.src = imageUrl;

  //create an H1 and set the textContent to the comic's title
  const title = document.createElement('h1');
  title.textContent = randomComic.title;

  //create a <p> and set the textContent to the comic's description
  const description = document.createElement('p');
  description.textContent = randomComic.description;

  //create a <p> and set the textContent to the print issue date
  const printIssueDate = document.createElement('p');

  container.appendChild(card);
  card.appendChild(image);
  card.appendChild(title);
  card.appendChild(description);

  htmlGen.createDatesElement(document, card, randomComic);

};
request.send();

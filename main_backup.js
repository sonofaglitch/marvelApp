var dates = require('./randomDates');
var htmlGen = require('./htmlGenerator');
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
var dateString1 = dateRange[0].getFullYear() + "-" + (dateRange[0].getMonth()+1) + "-"+ dateRange[0].getDate();
var dateString2 = dateRange[1].getFullYear() + "-" + (dateRange[1].getMonth()+1) + "-"+ dates.daysInMonth(dateRange[1].getMonth());
console.log(dateString1);
console.log(dateString2);
console.log('Finding a random comic from between ' + dateString1 + ' & ' + dateString2 + ':');

var call = url+"?&limit=100&dateRange="+dateString1+","+dateString2+credentials;

const app = document.getElementById('root');
const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.class='container';

app.appendChild(logo);
app.appendChild(container);


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

  var saleDate;
  var digitalPurchaseDate;

  //If digitalPurchaseDate Present...
  if ('digitalPurchaseDate' in randomComic.dates){
    console.log('Found a digital purchase date');
    const digitalIssueDate = document.createElement('p');
  };

  randomComic.dates.forEach (result => {
      if (result['type'] == 'onsaleDate'){
          saleDate = result['date'];
          var saleDateString = saleDate.substr(8,2) + " " + saleDate.substr(5,2) + " " + saleDate.substr(0,4) ;
      }
      else if (result['type'] == 'digitalPurchaseDate'){
          digitalPurchaseDate = result['date'];
          var digitalDateString = digitalPurchaseDate.substr(8,2) + " " + digitalPurchaseDate.substr(5,2) + " " + digitalPurchaseDate.substr(0,4) ;
      };
  });

  printIssueDate.innerHTML = "<strong>Onsale Date:</strong> " + saleDateString;
  digitalIssueDate.textContent = "<strong>Digital Date:</strong> " + digitalDateString;

  container.appendChild(card);
  card.appendChild(image);
  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(printIssueDate);
  card.appendChild(digitalIssueDate);
};
request.send();

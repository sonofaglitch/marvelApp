(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var exports = module.exports = {};

exports.createLogoElement = function(aDocument){
  console.log('Running createLogoElement');

  var logo = aDocument.createElement('img');
  logo.src = 'logo.png';

  return logo;
};

exports.createContainer = function(aDocument){
  console.log('Running createContainerElement');

  const container = document.createElement('div');
  container.class='container';

  return container;
};

},{}],2:[function(require,module,exports){
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

  container.appendChild(card);
  card.appendChild(image);
  card.appendChild(title);
  card.appendChild(description);

  var saleDate;
  var digitalPurchaseDate;

  randomComic.dates.forEach (result => {
      if (result['type'] == 'onsaleDate'){
          saleDate = result['date'];
      }
      else if (result['type'] == 'digitalPurchaseDate'){
          digitalPurchaseDate = result['date'];
      };
  });

  //If digitalPurchaseDate Present...
  if ('digitalPurchaseDate' in randomComic.dates){
    console.log('Found a digital purchase date');
    const digitalIssueDateElement = document.createElement('p');
    var digitalDateString = digitalPurchaseDate.substr(8,2) + " " + digitalPurchaseDate.substr(5,2) + " " + digitalPurchaseDate.substr(0,4);
    digitalIssueDateElement.textContent = "<strong>Digital Date:</strong> " + digitalDateString;
    card.appendChild(digitalIssueDate);
  };

  var saleDateString = saleDate.substr(8,2) + " " + saleDate.substr(5,2) + " " + saleDate.substr(0,4) ;


  printIssueDate.innerHTML = "<strong>Onsale Date:</strong> " + saleDateString;
  card.appendChild(printIssueDate);


};
request.send();

},{"./htmlGenerator":1,"./randomDates":3,"fs":4}],3:[function(require,module,exports){
var exports = module.exports = {};

exports.random = function(min, max){
  //Returns a random number between min and max
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.randomYear = function(min, max){
  //Returns a random year between min(int) and max(int)
  return exports.random(min, max);
};

exports.randomMarvelYear = function (){
  //Returns a random year between 1939 (year of first Marvel
  //comic) and current year
  const firstYear = 1939;
  var result = exports.randomYear(firstYear, new Date().getFullYear());
  return result;
};


exports.randomMonth = function(aYear){
//Given aYear(int) returns a random month between 1 and 12
//if year is current, return a month between 1 and currentMonth
  var month;

  if (aYear == new Date().getFullYear()){
    return exports.random(1, new Date().getMonth() + 1);
  }
  else{
    return exports.random(1,12 + 1);
  }
}

exports.daysInMonth = function(aMonth){
  //Given aMonth (int) returns the number of days
  //in aMonth
  const shortMonths = [4,6,9,11];
if (aMonth==2){
  return 28;
}
else if(shortMonths.includes(aMonth)){
  return 30;
  }
  else{
    return 31;
  }
};

exports.getRandomMarvelDate = function(){
  var year = exports.randomMarvelYear();
  var month = exports.randomMonth(year);
  var day = 1;
  var dateString = year + "-" + month + "-" + day;
  return new Date(year, month, day);
};


exports.getMarvelDates = function(){

  var date1 = exports.getRandomMarvelDate();
  var date2 = exports.getRandomMarvelDate();
  var dates = [];

  if (new Date(date1) >= new Date(date2)){
    dates = [date2,date1];
    return dates;
  }
  else {
      dates = [date1,date2];
      return dates;
    };
};


//Todo - second date should be end of month, to ensure always at least one month's worth of data returned

},{}],4:[function(require,module,exports){

},{}]},{},[2]);

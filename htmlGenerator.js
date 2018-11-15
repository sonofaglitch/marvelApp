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

exports.createDatesElement = function(aDocument, card, comicsArray){
  console.log('Running createDatesElement');

  var onsaleDate;
  var digitalPurchaseDate;
  var randomComic = comicsArray;

  randomComic.dates.forEach (result => {
      if (result['type'] == 'onsaleDate'){
          onsaleDate = result['date'];
          //Create page element and set to display onSale Date
          const onsaleDateElement = document.createElement('p');
          var onsaleDateString = onsaleDate.substr(8,2) + " " + onsaleDate.substr(5,2) + " " + onsaleDate.substr(0,4);
          onsaleDateElement.innerHTML = "<strong>Onsale Date:</strong> " + onsaleDateString;
          card.appendChild(onsaleDateElement);
      }
      else if (result['type'] == 'digitalPurchaseDate'){
          console.log('Found a digitalPurchaseDate:' + result['date']);
          digitalPurchaseDate = result['date'];
          //Create page element and set to display onSale Date
          const digitalIssueDateElement = document.createElement('p');
          var digitalDateString = digitalPurchaseDate.substr(8,2) + " " + digitalPurchaseDate.substr(5,2) + " " + digitalPurchaseDate.substr(0,4);
          digitalIssueDateElement.innerHTML = "<strong>Digital Date:</strong> " + digitalDateString;
          card.appendChild(digitalIssueDateElement);
      };
  });
};

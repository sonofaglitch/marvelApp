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

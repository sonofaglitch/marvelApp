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

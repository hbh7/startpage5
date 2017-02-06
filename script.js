window.onload = function() {

    count = -1;
    input = document.getElementById("input");

    dateInfo()
    dispayWeather(weather);
}

function dateInfo(){

  var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var timeDisplay = document.getElementById("time");
  var dateDisplay = document.getElementById("date");

  var date = new Date,
      hour = date.getHours(),
      minute = date.getMinutes(),
      second = date.getSeconds();
      day = date.getDay();
      month = date.getMonth();
      year = date.getFullYear();
      numberDate = date.getDate();

  hour = date.getHours();

  if(date.getMinutes() < 10)
    minute = "0" + date.getMinutes();
  else {
    minute = date.getMinutes();
  }

  if(date.getSeconds() < 10)
    second = "0" + date.getSeconds();
  else {
    second = date.getSeconds();
  }

   if(hour > 12)
    hour = hour - 12;


  ampm = (date.getHours() >= 12)? ' pm' : ' am';

  timeDisplay.innerHTML = hour + ":" + minute + ":" + second + ampm;
  dateDisplay.innerHTML = days[day] + ", " + months[month] + " " + numberDate + ", " + year;
  setTimeout("dateInfo()",1000);
}

function dispayWeather(weather){

  console.log("New Condition: ", weather.conditions);
  console.log("New Temp: ", weather.temp);
  console.log("New Summary: ", weather.summary);

  var temp = Math.round(weather.temp);
  var conditions = weather.conditions;
  var summary = weather.summary;
  var tempDisplay = document.getElementById("temperature");
  var summaryDisplay = document.getElementById("summary");
  var conditionsDisplay = document.getElementById("conditions");

  tempDisplay.innerHTML = temp + "°  ";
  summaryDisplay.innerHTML = summary;

  var skycons = new Skycons({"color": "white"});

  if (conditions == "cloudy") {
      skycons.add("conditions", Skycons.CLOUDY);
  } else if (conditions == "clear-day") {
	  console.log("Picking skycons.clear_day");
      skycons.add(document.getElementById("conditions"), Skycons.CLEAR_DAY);
  } else if (conditions == "clear-night") {
	  console.log("Picking skycons.clear_night");
      skycons.add(document.getElementById("conditions"), Skycons.CLEAR_NIGHT);
  } else if (conditions == "Rain") {
	  console.log("Picking skycons.rain");
      skycons.add(document.getElementById("conditions"), Skycons.RAIN);
  } else if (conditions == "snow") {
	  console.log("Picking skycons.snow");
      skycons.add(document.getElementById("conditions"), Skycons.SNOW);
  } else if (conditions == "sleet") {
	  console.log("Picking skycons.sleet");
      skycons.add(document.getElementById("conditions"), Skycons.SLEET);
  } else if (conditions == "wind") {
	  console.log("Picking skycons.wind");
      skycons.add(document.getElementById("conditions"), Skycons.WIND);
  } else if (conditions == "fog") {
	  console.log("Picking skycons.fog");
      skycons.add(document.getElementById("conditions"), Skycons.FOG);
  } else if (conditions == "partly-cloudy-day") {
	  console.log("Picking skycons.partly_cloudy_day");
      skycons.add(document.getElementById("conditions"), Skycons.PARTLY_CLOUDY_DAY);
  } else if (conditions == "party-cloudy-night") {
	  console.log("Picking skycons.partly_cloudy_night");
      skycons.add(document.getElementById("conditions"), Skycons.PARTLY_CLOUDY_NIGHT);
  } else {
	  console.log("Wasn't sure what to pick, so went with skycons.clear_day");
      skycons.add(document.getElementById("conditions"), Skycons.CLEAR_DAY);
  }

  skycons.play();

}

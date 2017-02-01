window.onload = function() {
    getConfig();

    count = -1;
    input = document.getElementById("input");
    websites = [];
    colors = [];

    dateInfo()
    //getWeather();
    dispayWeather(weather);
}

function getConfig() {
    var request = new XMLHttpRequest();
    request.overrideMimeType("application/json");
    request.open('GET', "config.json", true);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var config = JSON.parse(request.responseText);

            locate = config.location;
            metric = config.metric;
            meridiem = config.meridiem;
            searchEngine = config.searchEngine;

            for (i = 0; i < config.colors.length; i++) {
                colors.push(config.colors[i])
            }
            for (i = 0; i < config.websites.length; i++) {
                websites.push(config.websites[i]);
            }

            websites.sort();

        } else {
            console.log('Wrong request status');
        }
    };
    request.error = function() {
        console.log("config.json is missing");
    };
    request.send()
}



function dateInfo(){

  var months = ["Jan","Fed","March","April","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];
  var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var timeDisplay = document.getElementById("time");
  var dateDisplay = document.getElementById("date");
  var dayDisplay = document.getElementById("day");


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

function keyHandle(event){
  if(event.keyCode == 13)
    barHandle();
}

function getWeather(){

  var APPID = "63ea39292d2682b4b8db86a20e1a69dd";
  var url = "http://api.openweathermap.org/data/2.5/weather?" +
    "id=" + 4794457 +
    ",us&APPID=" + APPID;


  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
      var data = JSON.parse(xmlhttp.responseText);
      console.log(data);
      var weather = {};
      weather.temp = data.main.temp
      weather.condition = data.weather[0].description;
      dispayWeather(weather);
    }
  };
  xmlhttp.open("GET",url,true);
  xmlhttp.send();

}

function dispayWeather(weather){

  console.log("New Condition: ", weather.conditions);
  console.log("New Condition: ", weather.temp);

  var temp = Math.round(weather.temp);
  var conditions = weather.conditions;
  var tempDisplay = document.getElementById("temperature");
  var conditionsDisplay = document.getElementById("conditions");
  console.log(conditionsDisplay);
  console.log(conditions);


  tempDisplay.innerHTML = temp + "°  ";

  var skycons = new Skycons({"color": "white"});


  if (conditions == "cloudy") {
      conditionsDisplay.alt = "Cloudy";
      skycons.add("conditions", Skycons.CLOUDY);
  } else if (conditions == "clear-day") {
      conditionsDisplay.alt = "Clear Skies";
      skycons.add(document.getElementById("conditions"), Skycons.CLEAR_DAY);
  } else if (conditions == "clear-night") {
      conditionsDisplay.alt = "Clear Skies";
      skycons.add(document.getElementById("conditions"), Skycons.CLEAR_NIGHT);
  } else if (conditions == "Rain") {
      conditionsDisplay.alt = "Rain";
      skycons.add(document.getElementById("conditions"), Skycons.RAIN);
  } else if (conditions == "snow") {
      conditionsDisplay.alt = "Snow";
      skycons.add(document.getElementById("conditions"), Skycons.SNOW);
  } else if (conditions == "sleet") {
      conditionsDisplay.alt = "Sleet";
      skycons.add(document.getElementById("conditions"), Skycons.SLEET);
  } else if (conditions == "wind") {
      conditionsDisplay.alt = "Windy";
      skycons.add(document.getElementById("conditions"), Skycons.WIND);
  } else if (conditions == "fog") {
      conditionsDisplay.alt = "Foggy";
      skycons.add(document.getElementById("conditions"), Skycons.FOG);
  } else if (conditions == "partly-cloudy-day") {
      conditionsDisplay.alt = "Party Cloudy";
      skycons.add(document.getElementById("conditions"), Skycons.PARTLY_CLOUDY_DAY);
  } else if (conditions == "party-cloudy-night") {
      conditionsDisplay.alt = "Partly Cloudy";
      skycons.add(document.getElementById("conditions"), Skycons.PARTLY_CLOUDY_NIGHT);
  } else {
      conditionsDisplay.alt = "Not sure...";
      skycons.add(document.getElementById("conditions"), Skycons.CLEAR_DAY);
  }

  skycons.play();

}

// Set up constants for the clock
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function getLocation() {
   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getWeather, showError);
   } else {
      document.getElementById("summary").innerText = "Geolocation not supported/enabled, no weather available.";
   }
}

function getWeather(position) {
   // Make a request to weather.php with the user's location
   const Http = new XMLHttpRequest();
   const url = "/weather.php?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
   Http.open("GET", url);
   Http.send();

   // Once the request is complete, use the data to update the page
   Http.onreadystatechange = (e) => {
      // Check for problems and process the request data if available
      if (Http.readyState === 4) {
         try {
            let weather = JSON.parse(Http.responseText);
            if (weather != null) {
               if (weather["error"]) {
                  showError(weather["error"]);
                  // Retry in 30 seconds
                  setTimeout(getLocation, 30000);
               } else {
                  displayWeather(weather);
                  // Refresh in 15 minutes
                  setTimeout(getLocation, 150000);
               }
            }
         } catch {
            showError("A JSON parse error occurred.");
            // Retry in 30 seconds
            setTimeout(getLocation, 30000);
         }
      }
   }
}

function showError(error) {
   let loadingSpan = document.getElementById("summary");
   console.log("An error occurred with the weather system:")
   console.log(error);
   // Switch between error types: from the HTTP request / location request, or
   if (typeof(error) === "string") {
      loadingSpan.innerText = "An error occurred, no weather available.";
   } else {
      switch (error.code) {
         case error.PERMISSION_DENIED:
            loadingSpan.innerText = "Request for location was denied, no weather available.";
            break;
         case error.POSITION_UNAVAILABLE:
            loadingSpan.innerText = "Location information is unavailable, no weather available.";
            break;
         case error.TIMEOUT:
            loadingSpan.innerText = "Location request timed out, no weather available.";
            break;
         case error.UNKNOWN_ERR:
         default:
            loadingSpan.innerText = "An error occurred, no weather available.";
            break;
      }
   }
}

function updateClock() {
   let date = new Date;
   // Adjust the 0-23 hour for 12 hour time
   let hour = date.getHours() === 0 ? 12 : (date.getHours() > 12 ? date.getHours() - 12 : date.getHours());
   // Pad the minutes and seconds with a leading zero
   let minute = (date.getMinutes() < 10 ? "0": "") + date.getMinutes();
   let second = (date.getSeconds() < 10 ? "0": "") + date.getSeconds();
   let dayOfWeek = days[date.getDay()];
   let dayOfMonth = date.getDate();
   let month = months[date.getMonth()];
   let year = date.getFullYear();
   let ampm = (date.getHours() >= 12) ? ' pm' : ' am';

   // Display everything
   document.getElementById("time").innerText = hour + ":" + minute + ":" + second + ampm;
   document.getElementById("date").innerText = dayOfWeek + ", " + month + " " + dayOfMonth + ", " + year;

   // Set a timer to update the clock again
   setTimeout(updateClock, 1000);
}

function displayWeather(weather) {
   // Set up variables from weather data
   let temp = Math.round(weather["currently"]["temperature"]);
   let icon = weather["currently"]["icon"];
   let summary = weather["currently"]["summary"];

   // Set up outputs
   let tempDisplay = document.getElementById("temperature");
   let summaryDisplay = document.getElementById("summary");

   // Display data
   tempDisplay.innerHTML = temp + "°";
   summaryDisplay.innerHTML = summary;

   // Display icon
   let skycons = new Skycons({"color": "white"});
   if (icon === "cloudy") {
      skycons.add("conditions", Skycons.CLOUDY);
   } else if (icon === "clear-day") {
      skycons.add(document.getElementById("conditions"), Skycons.CLEAR_DAY);
   } else if (icon === "clear-night") {
      skycons.add(document.getElementById("conditions"), Skycons.CLEAR_NIGHT);
   } else if (icon === "rain") {
      skycons.add(document.getElementById("conditions"), Skycons.RAIN);
   } else if (icon === "snow") {
      skycons.add(document.getElementById("conditions"), Skycons.SNOW);
   } else if (icon === "sleet") {
      skycons.add(document.getElementById("conditions"), Skycons.SLEET);
   } else if (icon === "wind") {
      skycons.add(document.getElementById("conditions"), Skycons.WIND);
   } else if (icon === "fog") {
      skycons.add(document.getElementById("conditions"), Skycons.FOG);
   } else if (icon === "partly-cloudy-day") {
      skycons.add(document.getElementById("conditions"), Skycons.PARTLY_CLOUDY_DAY);
   } else if (icon === "party-cloudy-night") {
      skycons.add(document.getElementById("conditions"), Skycons.PARTLY_CLOUDY_NIGHT);
   } else {
      console.log("Unknown weather condition: " + icon + ", picking skycons.clear_day");
      skycons.add(document.getElementById("conditions"), Skycons.CLEAR_DAY);
   }
   skycons.play();
}


window.onload = function () {
   // Get the user's location (will also show the weather after)
   getLocation();
   // Start the clock
   updateClock();
}

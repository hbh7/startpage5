<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Start</title>
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
    <meta name="theme-color" content="#222">
    <link rel="stylesheet" href="styles.css">
    <script async src="script.js"></script>
    <script src="skycons.js"></script>
    <link href="https://fonts.googleapis.com/css?family=Pacifico" rel="stylesheet">
  </head>
  <body>
    <div class="container">
       <canvas id="conditions" width="128" height="128"></canvas>
       <div id="summary"></div>
       <div id="time">Loading...</div>
       <div id="date"></div>
       <div id="temperature"></div>
    </div>

    <div class="footerLeft">
  	 <a href="?run=true" ;="">Pull Updates from Github</a>
  	</div>

    <div class="footerRight">
  	 <a href="https://darksky.net/poweredby/">Weather Powered by Dark Sky</a>
  	</div>

  </body>

  <?php
    include 'DarkSky.php';

    // Creates an instance of the API wrapper.
    $darksky = new DarkSky('6299a3300621e680018826a6928a21d1');

    // Returns a forecast for the next hour at a specific location
    $forecast = $darksky->getForecast(41.813099, -73.115601);

    $weatherCurrentIcon = $forecast['currently']['icon'];
    $weatherCurrentTemp = $forecast['currently']['temperature'];
    $weatherCurrentSummary = $forecast['currently']['summary'];

    if ($_GET['run']) {
      # This code will run if ?run=true is set.
      shell_exec("/var/www/updatestartpage");
      sleep(5);
      header("Location: index.php");
    }

    //Debug
    //print_r($weatherCurrentSummary);
    //print_r($forecast);

  ?>
  <script>
      var weather = {};
      weather.conditions = "<?php echo $weatherCurrentIcon; ?>";
      weather.temp = <?php echo $weatherCurrentTemp; ?>;
      weather.summary = "<?php echo $weatherCurrentSummary; ?>";

      setTimeout(function() { checkPage(); }, 6000);

      function checkPage() {
        var timeDiv = document.getElementById('time');
        textContent = timeDiv.textContent;

        if (textContent.includes("Loading")) {
          location.reload();
        }
      }

  </script>
</html>

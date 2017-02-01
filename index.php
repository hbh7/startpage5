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
    <script src="csi.min.js" type="text/javascript"></script>
  </head>

  <body>
    <div class="container">
       <canvas id="conditions" width="128" height="128"></canvas>
       <div id="time" type="text">Time</div>
       <div id="date" type="text"></div>
    </div>

    <div style="text-align: center; width: 100%; margin-bottom: 2%;">
      <div style="display:inline" id="temperature" style="text"></div>
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

  ?>
  <script>
      var weather = {};
      weather.conditions = "<?php echo $weatherCurrentIcon; ?>";
      weather.temp = <?php echo $weatherCurrentTemp; ?>;
  </script>
</html>

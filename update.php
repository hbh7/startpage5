<?php

// Load the API key from an environment file
$env = parse_ini_file(".env");
$cicd_key = $env["CICD_KEY"];
if ($cicd_key == null) {
   http_response_code(500);
   echo "Error: CICD key not supplied in ENV file.";
   die;
}

// This code will update the repo only if it's called via a POST request with the correct auth key
if ($_SERVER["REQUEST_METHOD"] === "POST") {
   if ($_POST["CICD_KEY"] === $cicd_key) {
      $output = [];
      $resultCode = 0;
      exec("cd /var/www/html/resume && git reset --hard && git pull 2>&1", $output, $resultCode);

      foreach($output as $line) {
         echo $line . "\n";
      }
      if($resultCode != 0) {
         echo "\nUpdate has failed.";
         http_response_code(500);
      } else {
         echo "\nUpdate complete.";
         http_response_code(200);
      }

   } else {
      echo "Error: CICD key not valid.";
      http_response_code(401);
   }

} else {
   echo "Error: GET request not permitted.";
   http_response_code(405);
}

<?php

// Load the API key from an environment file
$env = parse_ini_file(".env");
$cicd_key = $env["CICD_KEY"];
if ($cicd_key == null) {
   echo "Error: CICD key not supplied in ENV file.";
   die;
}

// This code will update the repo only if it's called via a POST request with the correct auth key
if ($_SERVER["REQUEST_METHOD"] === "POST") {
   if ($_POST["CICD_KEY"] === $cicd_key) {
      $output = shell_exec("cd /var/www/start.hbh7.com && git pull 2>&1");
      echo $output;
      echo "Update complete.";
   } else {
      echo "Error: CICD key not valid.";
   }
} else {
   echo "Error: GET request not permitted.";
}

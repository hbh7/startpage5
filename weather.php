<?php

/**
 * A simple wrapper for the Pirate Weather API.
 * More information about the Pirate Weather API can be found here: https://docs.pirateweather.net/en/latest/API/
 *
 * @package Startpage5
 * @author hbh7 <hbh7@hbh7.com>
 */
class PirateWeather
{
   /** @var string $API_URL The base url for the API calls */
   const API_URL = 'https://api.pirateweather.net';

   /** @var string $apiKey The API key to use when making API calls */
   private $apiKey;

   /**
    * Basic constructor that loads the API key from an environment file (.env).
    */
   public function __construct() {
      // Load the API key from an environment file
      $env = parse_ini_file('.env');
      $this->apiKey = $env["API_KEY"];
      if ($this->apiKey == null) {
         $output["error"] = "API Key not supplied.";
         echo json_encode($output);
         die;
      }
   }

   /**
    * Retrieves the forecast for the given latitude and longitude.
    *
    * @param $lat float The latitude
    * @param $lon float The longitude
    *
    * @return string The decoded JSON response from the API call
    */
   public function getForecast($lat, $lon) {
      $url = sprintf('/forecast/%s/%s,%s', $this->apiKey, $lat, $lon);
      return $this->makeAPIRequest($url);
   }

   /**
    * Makes a request to the weather API. Requires the server to have allow_url_fopen enabled.
    *
    * @param $url string The URL endpoint to hit
    *
    * @return string The decoded JSON response from the API call
    */
   private function makeAPIRequest($url) {
      $url = self::API_URL . $url;
      $response = file_get_contents($url);
      if ($response === false) {
         $output["error"] = "Unknown error occurred while contacting the weather API.";
         echo json_encode($output);
         die;
      }

      $json = json_decode($response, true);

      if ($json === null) {
         switch ($error_code = json_last_error()) {
            case JSON_ERROR_SYNTAX:
               $reason = 'Bad JSON Syntax';
               break;
            case JSON_ERROR_CTRL_CHAR:
               $reason = 'Unexpected control character found';
               break;
            default:
               $reason = sprintf('Error code %s', $error_code);
               break;
         }

         $output["error"] = "An error occurred while contacting the weather API: " . $reason;
         echo json_encode($output);
         die;
      }

      return $response;
   }
}

// Create an instance of the API wrapper.
$api = new PirateWeather();

// Check that latitude and longitude values were provided
if (!isset($_GET['lat'])) {
   $output["error"] = "Latitude not supplied";
   echo json_encode($output);
   die;
}
if (!isset($_GET['lon'])) {
   $output["error"] = "Longitude not supplied";
   echo json_encode($output);
   die;
}

// Returns a forecast for the next hour at a specific location
echo $api->getForecast($_GET['lat'], $_GET['lon']);

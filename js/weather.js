var wthr_url = "api.openweathermap.org/data/2.5/weather?q=charlotte&units=metric&APPID=38033c121001eb80e9aed2f4b8f0ad8e";
var $curr_temp;
var $curr_cond = "";

$(document).ready(function() {
 $.ajax({
   url: wthr_url,
   data: {
     format: "json"
   },
   error: function(xhr, status, error) {
     var err = eval("(" + xhr.responseText + ")");
     console.log(err.Message);
   },
   success: function(data) {
     $curr_temp = data.main.temp;
     $curr_cond = data.weather[0].main;
     $("#weather").html("<p>" + $curr_temp + " " + $curr_cond + "</p>");
   },
   type: "GET"
 });
 });


function CurrentDayForecast(city) {

    var APIkey = "&appid=801906cebc106515bac3bda6ad7c527b";
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + APIkey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        
        var city = $("<h1>").text(response.city.name);
        var temperature = response.list[0].main.temp;
        var tempK = (temperature - 273.15) * 1.80 + 32;
        var tempF = $("<h3>").text("Temperature (F): " + tempK.toFixed(0));
        var humid = $("<h3>").text("Humidity: " + response.list[0].main.humidity + " % ");
        var windspeed = $("<h3>").text("Wind Speed: " + response.list[0].wind.speed + " mph");
        var CurrentWeatherIcon = response.list[0].weather[0].icon;
        var getCurrentWeatherIcon = $("<img src = http://openweathermap.org/img/wn/" + CurrentWeatherIcon + "@2x.png />");


        var cardbodA = $("#card-body1").append(city, getCurrentWeatherIcon, tempF, humid, windspeed);

        $("#current-day").append(cardbodA);
    });

}

function multipledayForecast(city) {
    var APIkey = "&appid=801906cebc106515bac3bda6ad7c527b";
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + APIkey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.list
        for (var i = 0; i < results.length; i++) {
            if ((results[i].dt_txt.indexOf("12:00:00") !== -1)) {
                var dailydiv = $('<div class="card col-md-2 ml-4 bg-primary text-white"></div>');
                var subdailydiv = $('<div class="card-body p-3 forecastBody"></div>')
                var degrees = results[i].main.temp;
                var degInKel = Math.floor((degrees - 273.25) * 1.80 + 32);
                var degInFaren = $("<h5>").text("Temperature (F): " + degInKel.toFixed(0));
                var sweaty = $("<h6>").text("Humidity: " + results[i].main.humidity + " % ");
                var windfast = $("<h7>").text("Wind Speed: " + results[i].wind.speed + " mph");
                var CurrentWeatherIcons = response.list[i].weather[0].icon;
                var getCurrentWeatherIcons = $("<img src = http://openweathermap.org/img/wn/" + CurrentWeatherIcons + "@2x.png />")


                var dailydivA = subdailydiv.append(degInFaren, sweaty, windfast, getCurrentWeatherIcons);
                var dailydivB = dailydiv.append(dailydivA);


                var dailyforecast = $(".row").append(dailydivB);

                $(".container").append(dailyforecast);


            }

        }
    });

}

$("#SearchBtn").on("click", function (event) {
    event.preventDefault();

    var cityinput = $("#Search-Term").val().trim();

    CurrentDayForecast(cityinput);
    $("#card-body1").empty();

    multipledayForecast(cityinput);
    $(".row").empty();

});

$("#Search-Term").keypress(function(e){
    if(e.which == 13){
        $("#SearchBtn").click();
    }
});


const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const fs = require("fs");


const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static("public"));

const index = fs.readFileSync("index_2.html", "utf-8");

const updateItems = (weatherData) => {
    var temp = weatherData.main.feels_like;

    var description = weatherData.weather[0].description;
    var icon = weatherData.weather[0].icon;
    var icon_url = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

    var result = index.replace("{00}", temp);
    result = result.replace("{descr..}", description);
    result = result.replace("{img_src}", icon_url);
    result = result.replace("{location}", weatherData.name);

    return result;
}

app.get("/failure", function (req, res) {
    res.sendFile(__dirname+"/index_3.html");
});
app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index_1.html");

});

app.post("/failure", function (req, res) {
    res.redirect("/");
});


app.post("/", function (req, res) {
    var location = req.body.location;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&APPID=2fb82d89ce48afc6350aaf477dd4cf65&units=metric";

    https.get(url, function (response) {
        if (response.statusCode === 200) {
            response.on("data", function (data) {

                var weatherData = JSON.parse(data);
                var newWeatherData = updateItems(weatherData);
                res.write(newWeatherData);
                res.send();

            })
        }
        else {

            res.sendFile(__dirname + "/index_3.html");

        }
    })
});


app.listen(3000, function () {
    console.log("server is up at 3000");
});


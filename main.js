let skyImg = document.getElementById('skyImg');
let skyText = document.getElementById('skyText');
let temp = document.getElementById('temp');
let locationn = document.getElementById('location');
let feels = document.getElementById('feels');
let humidity = document.getElementById('humidity');
let locationInput = document.getElementById('locationInput');
let locationBtn = document.getElementById('locationBtn');
let refreshBtn = document.getElementById('refreshBtn');

let tempData, descriptionData, locationData, feels_likeData, humidityData, day_nightChecker;
let defaultLocation = 'Haskovo';

function APIrequest() {
    let request = new XMLHttpRequest();
    let API = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=" + defaultLocation + "&appid=baecdbf7f75171e614a981fc4acba560";
    request.open("GET", API);
    request.send();
    request.onload = () => {
        console.log(request);
        if (request.status === 200) {
            let data = JSON.parse(request.response);
            tempData = data["main"]["temp"]
            feels_likeData = data["main"]["feels_like"]
            humidityData = data["main"]["humidity"]
            descriptionData = data["weather"][0]["description"]
            locationData = data["name"] + "/" + data["sys"]["country"]
            day_nightChecker = data["weather"][0]["icon"].replace(/[0-9]/g, '');
            console.log(`Temperature: ${tempData} °C, Humidity: ${humidityData}% , Description: ${descriptionData}`)
            successfulRequest()
        } else {
            console.log(`error ${request.status} ${request.statusText}`);
            failedRequest()
        }
    };
}

function successfulRequest() {
    if (day_nightChecker == "d") {
        if (descriptionData == "clear sky") {
            skyImg.src = "img/clear-day.svg"
        } else if (descriptionData == "few clouds")
            skyImg.src = "img/cloudy-1-day.svg"
        else if (descriptionData == "scattered clouds")
            skyImg.src = "img/cloudy-2-day.svg"
        else if (descriptionData == "broken clouds")
            skyImg.src = "img/cloudy-3-day.svg"
        else if (descriptionData == "cloudy")
            skyImg.src = "img/cloudy.svg"
        else if (descriptionData == "light rain")
            skyImg.src = "img/rainy-1-day.svg"
        else if (descriptionData == "overcast clouds")
            skyImg.src = "img/cloudy.svg"
        else if (descriptionData == "fog")
            skyImg.src = "img/fog-day.svg"
        else if (descriptionData == "snow")
            skyImg.src = "img/snowy-2.svg"
        else if (descriptionData == "light snow")
            skyImg.src = "img/snowy-1.svg"
    } else {
        if (descriptionData == "clear sky") {
            skyImg.src = "img/clear-night.svg"
        } else if (descriptionData == "few clouds")
            skyImg.src = "img/cloudy-1-night.svg"
        else if (descriptionData == "scattered clouds")
            skyImg.src = "img/cloudy-2-night.svg"
        else if (descriptionData == "broken clouds")
            skyImg.src = "img/cloudy-3-night.svg"
        else if (descriptionData == "cloudy")
            skyImg.src = "img/cloudy.svg"
        else if (descriptionData == "light rain")
            skyImg.src = "img/rainy-1-night.svg"
        else if (descriptionData == "overcast clouds")
            skyImg.src = "img/cloudy.svg"
        else if (descriptionData == "fog")
            skyImg.src = "img/fog-night.svg"
        else if (descriptionData == "snow")
            skyImg.src = "img/snowy-2.svg"
        else if (descriptionData == "light snow")
            skyImg.src = "img/snowy-1.svg"
    }

    temp.innerText = Math.floor(tempData) + "°C"
    skyText.innerText = descriptionData
    locationn.innerText = locationData
    feels.innerText = Math.floor(feels_likeData) + "°C"
    humidity.innerText = humidityData + "%"
}

function failedRequest() {
    skyImg.src = "img/unknown.png"
    temp.innerText = "Error"
    skyText.innerText = "-"
    locationn.innerText = "Error"
    feels.innerText = "-"
    humidity.innerText = "-"
}

locationBtn.addEventListener("click", function () {
    defaultLocation = locationInput.value.replace(" ", "%20");;
    APIrequest();
})
locationInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter")
        document.getElementById("locationBtn").click();
});
refreshBtn.addEventListener("click", function () {
    APIrequest();
})
APIrequest();

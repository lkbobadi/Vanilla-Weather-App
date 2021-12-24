let now = new Date();
let ampm = "";
let hour = now.getHours();
let hours = [
  12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
];

if (hour < 11) {
  ampm = "AM";
} else {
  ampm = "PM";
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let day = now.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let time = `${hours[hour]}:${minutes}${ampm}`;
let date = document.querySelector(".date");
let weekDay = document.querySelector(".day");
weekDay.innerHTML = days[day];
date.innerHTML = time;

function showTemperature(response) {
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@2x.png`
  );
  let description = document.querySelector(".weather-description");
  description.innerHTML = response.data.list[0].weather[0].main;

  let country = document.querySelector(".country");
  country.innerHTML = `Country: ${response.data.list[0].sys.country}`;
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `Humidity: ${Math.round(
    response.data.list[0].main.humidity
  )}%`;

  let windSpeed = document.querySelector(".wind");
  windSpeed.innerHTML = `Wind Speed: ${Math.round(
    response.data.list[0].wind.speed
  )}m/s`;

  temperature = Math.round(response.data.list[0].main.temp);
  let mainTemp = document.querySelector(".main-temp");
  mainTemp.innerHTML = `${temperature}°F`;

  let location = response.data.list[0].coord;
  console.log(location);
  getForecast(location);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let units = "imperial";
  let apiKey = `57076c7f47016215ae76e0f26aed1cee`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#searchbar");
  searchCity(cityInput.value);
}

function searchCity(city) {
  let cityDisplay = document.querySelector(".city");
  cityDisplay.innerHTML = city;
  let units = "imperial";
  let apiKey = "57076c7f47016215ae76e0f26aed1cee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/find?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let temperature = null;

function displayCelsius(event) {
  event.preventDefault();
  farenheit.classList.remove("active");
  celsius.classList.add("active");
  let celsiusTemperature = Math.round(((temperature - 32) * 5) / 9);
  let mainTemperature = document.querySelector(".main-temp");
  mainTemperature.innerHTML = `${celsiusTemperature}°C`;
}

function displayFarenheit(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  farenheit.classList.add("active");
  let farenheitTemperature = Math.round(temperature);
  let mainTemperature = document.querySelector(".main-temp");
  mainTemperature.innerHTML = `${farenheitTemperature}°F`;
}
let celsius = document.querySelector(".celsius");
celsius.addEventListener("click", displayCelsius);

let farenheit = document.querySelector(".farenheit");
farenheit.addEventListener("click", displayFarenheit);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastTitle = document.querySelector("#forecast");
  let forecastHTML = ` <h2 class="forecast-title">Forecast</h2><div class="forecast row mb-4 ms-1 me-1">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class = "forecast-list col-2"><div class="extra-days">${formatDay(
          forecastDay.dt
        )}</div>
  );
<div class="forecast-symbol"><img src="https://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" width="50px" alt=""></div>
<div class="min-max row"><div class="forecast-max col-6">${Math.round(
          forecastDay.temp.max
        )}°</div>
<div class="forecast-min col-6">${Math.round(forecastDay.temp.min)}°</div>
</div></div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastTitle.innerHTML = forecastHTML;
}

searchCity("New York");

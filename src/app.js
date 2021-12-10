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
    `http://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@2x.png`
  );
  let description = document.querySelector(".weather-description");
  description.innerHTML = response.data.list[0].weather[0].main;

  let temperature = Math.round(response.data.list[0].main.temp);
  let mainTemp = document.querySelector(".main-temp");
  mainTemp.innerHTML = `${temperature}°F`;
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#searchbar");
  console.log(cityInput.value);
  searchCity(cityInput.value);
}

function searchCity(city) {
  let cityDisplay = document.querySelector(".city");
  cityDisplay.innerHTML = city;
  let units = "imperial";
  let apiKey = "57076c7f47016215ae76e0f26aed1cee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/find?q=${city}&units=${units}&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}
searchCity("Raleigh");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

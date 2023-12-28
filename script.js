document.addEventListener("DOMContentLoaded", function () {
  function formatDate(today) {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let day = days[today.getDay()];
    let month = months[today.getMonth()];
    let date = today.getDate();
    let year = today.getFullYear();
    let hours = today.getHours();
    let minutes = today.getMinutes();

    if (hours < 10) {
      hours = `0${hours}`;
    }

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    let displayDay = `${day} - ${month} ${date}, ${year} - ${hours}:${minutes}`;
    return displayDay;
  }

  function searchCity(event) {
    event.preventDefault();
    let changeCity = document.querySelector(".search-box");
    let newCity = document.querySelector(".city-name");
    newCity.innerHTML = changeCity.value;

    changeTemp(changeCity.value);
  }

  function changeTemp(cityInput) {
    let city = cityInput;
    let apiKey = "o0dcab20a49t4ddfcbc102a01c83f7a7";
    let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiURL).then(displayDetails);
  }

  function displayDetails(response) {
    let celsiusTemp = Math.round(response.data.temperature.current);
    let showCTemp = document.querySelector(".celsius-temp");
    showCTemp.innerHTML = celsiusTemp;

    let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
    let showFTemp = document.querySelector(".fahrenheit-temp");
    showFTemp.innerHTML = fahrenheitTemp;

    let weather = response.data.condition.description;
    let showDescription = document.querySelector(".weather-desc");
    showDescription.innerHTML = weather.toUpperCase();

    let humidity = response.data.temperature.humidity;
    let showHumidity = document.querySelector(".humidity");
    showHumidity.innerHTML = `${humidity}%`;

    let windSpeed = response.data.wind.speed;
    let showWindSpeed = document.querySelector(".wind-speed");
    showWindSpeed.innerHTML = `${windSpeed}km/h`;

    let icon = response.data.condition.icon_url;
    let showIcon = document.querySelector("#weather-icon");
    showIcon.innerHTML = `<img src="${icon}" class="weather-emoji"/>`;

    getForecast(response.data.city);
  }

  function getForecast(city) {
    let apiKey = "o0dcab20a49t4ddfcbc102a01c83f7a7";
    let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

    axios(apiURL).then(displayForecast);
  }

  function formatForecastDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["SUN", "MON", "TUES", "WED", "THURS", "FRI", "SAT"];

    return days[date.getDay()];
  }

  function displayForecast(response) {
    let forecastHtml = "";

    response.data.daily.forEach(function (day, index) {
      if (index < 5) {
        forecastHtml =
          forecastHtml +
          `<div id="forecast-block">
        <div id="forecast-day">${formatForecastDay(day.time)}</div>
        <img
          src="${day.condition.icon_url}"
          alt="weather forecast icon"
          width="80"
        />
        <div id="forecast-temp">
          <span class="forecast-max-temp">${Math.round(
            day.temperature.maximum
          )}° </span>
          <span class="forecast-min-temp">${Math.round(
            day.temperature.minimum
          )}°</span>
        </div>
      </div>`;
      }
    });

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
  }

  let origCity = document.querySelector(".city-name");
  changeTemp(origCity.textContent);

  console.log(origCity.textContent);

  let today = new Date();
  let currentTimeDay = formatDate(today);
  let dayTime = document.querySelector(".date-time");
  dayTime.innerHTML = currentTimeDay;

  let searchBox = document.querySelector("#input-search");
  searchBox.addEventListener("submit", searchCity);
});

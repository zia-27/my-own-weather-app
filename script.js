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
  let newCity = document.querySelector(".country-name");
  newCity.innerHTML = changeCity.value;

  changeTemp(changeCity.value);
}

function changeTemp(cityInput) {
  let city = cityInput;
  let apiKey = "o0dcab20a49t4ddfcbc102a01c83f7a7";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiURL).then(displayTemp);
}

function displayTemp(response) {
  console.log(response.data);
  let celsiusTemp = Math.round(response.data.temperature.current);
  let showCTemp = document.querySelector(".celsius-temp");
  showCTemp.innerHTML = celsiusTemp;

  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  let showFTemp = document.querySelector(".fahrenheit-temp");
  showFTemp.innerHTML = fahrenheitTemp;

  let humidity = response.data.temperature.humidity;
  let showHumidity = document.querySelector(".humidity");
  showHumidity.innerHTML = `${humidity}%`;
}

let origCity = document.querySelector(".country-name");
changeTemp(origCity.textContent);

console.log(origCity.textContent);

let today = new Date();
let currentTimeDay = formatDate(today);
let dayTime = document.querySelector(".date-time");
dayTime.innerHTML = currentTimeDay;

let searchBox = document.querySelector("#input-search");
searchBox.addEventListener("submit", searchCity);

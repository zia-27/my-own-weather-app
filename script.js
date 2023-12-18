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

let today = new Date();
let currentTimeDay = formatDate(today);
let dayTime = document.querySelector(".date-time");
dayTime.innerHTML = currentTimeDay;

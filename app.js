function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) minutes = `0${minutes}`;
  return `${day} ${hours}:${minutes}`;
}

function updateWeather(response) {
  const data = response.data;

  document.querySelector("#city").innerHTML = data.city;
  document.querySelector("#temperature").innerHTML = Math.round(
    data.temperature.current
  );
  document.querySelector("#description").innerHTML = data.condition.description;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${data.temperature.humidity}%`;
  document.querySelector("#wind-speed").innerHTML = `${data.wind.speed} km/h`;
  document.querySelector("#time").innerHTML = formatDate(data.time);
  document.querySelector(
    "#icon"
  ).innerHTML = `<img src="${data.condition.icon_url}" alt="${data.condition.description}" />`;
}

function searchCity(city) {
  const apiKey = "b2a5adcct04b33178913oc335f405433";
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearch(event) {
  event.preventDefault();
  const city = document.querySelector("#search-form-input").value.trim();
  if (city) {
    searchCity(city);
  }
}

document.querySelector("#search-form").addEventListener("submit", handleSearch);
searchCity("Paris"); // Default city

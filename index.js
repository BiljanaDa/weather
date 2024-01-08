async function getWeatherForcast() {
  const API_KEY = "e4c36e1eaac95d02ddd15bd512d87cb9";
  const LAT = 45.267136;
  const LON = 19.833549;
  const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric
  `;

  const response = await fetch(URL);
  const data = await response.json();
  const forecastList = data.list;
  formatList(forecastList);
}
getWeatherForcast();

function formatList(list) {
  const formatedList = list.map((weather) => {
    return {
      ...weather,
      date_time: new Date(weather.dt_txt),
    };
  });
  getUniqueDays(formatedList);
}

function getUniqueDays(list) {
  const days = {};
  for (const weather of list) {
    const key = weather.date_time.getDate();
    days[key] = weather;
  }

  const daysList = Object.values(days);
  daysList.sort((a, b) => a.date_time - b.date_time);
  displayWeatherData(daysList);
}

function displayWeatherData(days) {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const boxes = document.querySelectorAll(".box");
  for (let i = 0; i < boxes.length; i++) {
    const dayDisplay = boxes[i].getElementsByTagName("h3")[0];
    const tempDisplay = boxes[i].querySelector("#temp");

    tempDisplay.innerHTML = days[i].main.temp;
    dayDisplay.innerHTML = dayNames[days[i].date_time.getDay()];
  }
}

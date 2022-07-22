export { init, updateInfo, displayError, city, state, zipCode, mode, units };
import { getWeather, getWeeklyForecast } from './api.js';
import {
  addTempUnits,
  convertDate,
  parseString,
  convertWindDirection,
} from './helpers';
import overcast from './imgs/overcast.jpg';
import sunny from './imgs/sunny.jpg';
import cloudy from './imgs/cloudy.jpg';
import rainy from './imgs/rainy.jpg';
import snowy from './imgs/snowy.jpg';

let units = 'imperial';
let city = 'Los Angeles';
let state;
let zipCode;
let mode = 'city';

const weatherIcon = {
  Thunderstorm: 'fa-cloud-bolt',
  Drizzle: 'fa-cloud-rain',
  Rain: 'fa-cloud-showers-heavy',
  Snow: 'fa-snow-flake',
  Clouds: 'fa-cloud',
  Haze: 'fa-sun-haze',
  Clear: 'fa-sun',
  Mist: 'fa-cloud-fog',
  Smoke: 'fa-smog',
  Dust: 'fa-sun-dust',
  Fog: 'fa-cloud-fog',
  Sand: 'swords-laser',
  Ash: 'fa-volcano',
  Squall: 'fa-wind-warning',
  Tornado: 'fa-tornado',
};

async function updateInfo() {
  try {
    if (document.getElementById('error-message')) {
      document.getElementById('error-message').remove();
    }

    const data = await getWeather();
    setWeatherTheme(data.weather[0].main);
    document.getElementById('current-location').innerHTML = data.name;
    document.getElementById('current-temperature').innerHTML = addTempUnits(
      Math.round(data.main.temp),
      units
    );
    document.getElementById('current-description').innerHTML =
      data.weather[0].main;
    document.getElementById('current-high').innerHTML = `H: ${addTempUnits(
      Math.round(data.main.temp_max),
      units
    )}&nbsp;/&nbsp;`;
    document.getElementById('current-low').innerHTML = `L: ${addTempUnits(
      Math.round(data.main.temp_min),
      units
    )}`;
    document.getElementById(
      'current-feel'
    ).innerHTML = `Feels Like: ${addTempUnits(
      Math.round(data.main.feels_like),
      units
    )}`;
    document.getElementById('current-wind-speed').innerHTML = `${
      data.wind.speed
    } ${units === 'imperial' ? 'mph' : 'm/s'}`;
    document.getElementById(
      'current-wind-direction'
    ).innerHTML = `${convertWindDirection(data.wind.deg)}`;
    document.getElementById(
      'current-humidity'
    ).innerHTML = `Humidity: ${data.main.humidity}%`;
    document.getElementById(
      'current-pressure'
    ).innerHTML = `Pressure: ${data.main.pressure} mB`;
  } catch {
    displayError();
  }
}

function initDropdown() {
  const wrapper = document.getElementById('select-wrapper');
  const dropDown = document.createElement('div');
  const unitSelect = document.getElementById('unit-select');
  dropDown.classList.add('drop-down');
  wrapper.appendChild(dropDown);

  const optionOne = document.createElement('div');
  const optionTwo = document.createElement('div');

  optionOne.setAttribute('id', 'option-one');
  optionOne.innerHTML = '°F';
  optionTwo.setAttribute('id', 'option-two');
  optionTwo.innerHTML = '°C';
  dropDown.appendChild(optionOne);
  dropDown.appendChild(optionTwo);

  unitSelect.addEventListener('click', () => {
    dropDown.style.display = 'block';
  });

  optionOne.addEventListener('click', () => {
    units = 'imperial';
    unitSelect.innerHTML = '°F';
    dropDown.style.display = 'none';
    updateInfo();
    processWeeklyForecast();
  });

  optionTwo.addEventListener('click', () => {
    units = 'metric';
    unitSelect.innerHTML = '°C';
    dropDown.style.display = 'none';
    updateInfo();
    processWeeklyForecast();
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('#select-wrapper')) {
      dropDown.style.display = 'none';
    }
  });
}

function setWeatherTheme(data) {
  const icon = document.getElementById('current-weather-icon');
  icon.removeAttribute('class');
  icon.classList.add('fa-solid');
  icon.classList.add(weatherIcon[data]);
  if (data === 'Thunderstorm') {
    document.body.style.background = `url(${rainy}) center center fixed`;
  } else if (data === 'Drizzle') {
    document.body.style.background = `url(${overcast}) center center fixed`;
  } else if (data === 'Rain') {
    document.body.style.background = `url(${rainy}) center center fixed`;
  } else if (data === 'Snow') {
    document.body.style.background = `url(${snowy}) center center fixed`;
  } else if (data === 'Clouds') {
    document.body.style.background = `url(${cloudy}) center center fixed`;
  } else if (data === 'Haze') {
    document.body.style.background = `url(${overcast}) center center fixed`;
  } else {
    document.body.style.background = `url(${sunny}) center center fixed`;
  }
}

function initSearchListener() {
  const searchField = document.getElementById('city-input');
  searchField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      parseString(searchField.value);
      updateInfo();
      processWeeklyForecast();
    }
  });

  const searchIcon = document.getElementById('search-icon');
  searchIcon.addEventListener('click', () => {
    parseString(searchField.value);
    updateInfo();
    processWeeklyForecast();
  });
}

function init() {
  updateInfo();
  initSearchListener();
  initDropdown();
  processWeeklyForecast();
}

function displayError() {
  if (!document.getElementById('error-message')) {
    const header = document.querySelector('.header');
    const p = document.createElement('p');
    p.setAttribute('id', 'error-message');
    p.innerHTML =
      "Invalid location. Please use the following format 'City', 'City, State', or 'Zip Code'";
    header.appendChild(p);
  }
}

async function processWeeklyForecast() {
  try {
    let weekly = await getWeeklyForecast();
    let days = weekly.list.filter((day) => {
      return day.dt_txt.includes('18:00:00');
    });
    updateWeeklyForecast(days);
  } catch {
    displayError();
  }
}

function updateWeeklyForecast(days) {
  const forecastPanel = document.getElementById('weekly-forecast');
  while (forecastPanel.firstChild) {
    forecastPanel.removeChild(forecastPanel.firstChild);
  }
  days.forEach((day) => {
    const div = document.createElement('div');
    div.classList.add('weekly-forecast-item');
    forecastPanel.appendChild(div);
    const dtInfo = day.dt_txt.split(' ');

    const date = document.createElement('div');
    date.classList.add('forecast-item-date');
    date.innerHTML = convertDate(dtInfo[0], 'date');
    div.appendChild(date);

    const days = document.createElement('div');
    days.classList.add('forecast-item-day');
    days.innerHTML = convertDate(dtInfo[0], 'days');
    div.appendChild(days);

    const icon = document.createElement('div');
    icon.classList.add('forecast-item-icon');
    icon.classList.add('fa-solid');
    icon.classList.add(weatherIcon[day.weather[0].main]);
    div.appendChild(icon);

    const temperature = document.createElement('div');
    temperature.classList.add('forecast-item-temperature');
    temperature.innerHTML = addTempUnits(Math.round(day.main.temp), units);
    div.appendChild(temperature);
  });
}

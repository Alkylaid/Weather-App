export { init, updateInfo};
import { getWeather, getWeeklyForecast } from './api.js';
import {addTempUnits} from './helpers';
import overcast from './imgs/overcast.jpg';
import sunny from './imgs/sunny.jpg';
import cloudy from './imgs/cloudy.jpg';
import rainy from './imgs/rainy.jpg';
import snowy from './imgs/snowy.jpg';

let units = 'imperial';
let city = 'Fort Worth';

async function updateInfo(city, units) {
  const data = await getWeather(city, units);
  console.log(data);
  document.getElementById('current-location').innerHTML = data.name;

  setWeatherTheme(data.weather[0].main);
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
    units = "imperial";
    unitSelect.innerHTML = '°F';
    dropDown.style.display = 'none';
    updateInfo(city, units);
  });

  optionTwo.addEventListener('click', () => {
    units = "metric";
    unitSelect.innerHTML = '°C';
    dropDown.style.display = 'none';
    updateInfo(city, units);
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest("#select-wrapper")) {
        dropDown.style.display = 'none';
    }
  })
}

function setWeatherTheme(data) {
  const icon = document.getElementById('current-weather-icon');
  icon.removeAttribute('class');
  icon.classList.add('fa-solid');
  if (data === 'Thunderstorm') {
    icon.classList.add('fa-cloud-bolt');
    document.body.style.background = `url(${rainy}) center center fixed`;
  } else if (data === 'Drizzle') {
    icon.classList.add('fa-cloud-rain');
    document.body.style.background = `url(${overcast}) center center fixed`;
  } else if (data === 'Rain') {
    icon.classList.add('fa-cloud-showers-heavy');
    document.body.style.background = `url(${rainy}) center center fixed`;
  } else if (data === 'Snow') {
    icon.classList.add('fa-snow-flake');
    document.body.style.background = `url(${snowy}) center center fixed`;
  } else if (data === 'Clouds') {
    icon.classList.add('fa-cloud');
    document.body.style.background = `url(${cloudy}) center center fixed`;
  } else if (data === 'Haze') {
    icon.classList.add('fa-smog');
    document.body.style.background = `url(${overcast}) center center fixed`;
  } else {
    icon.classList.add('fa-sun');
    document.body.style.background = `url(${sunny}) center center fixed`;
  }
}

function convertWindDirection(data) {
  if ((data >= '350' && data <= '360') || (data >= '0' && data <= '10')) {
    return 'N &#8593;';
  } else if (data > '10' && data <= '30') {
    return 'N/NE &#8599; ';
  } else if (data > '30' && data <= '60') {
    return ' NE &#8599;';
  } else if (data > '60' && data <= '80') {
    return 'E/NE &#8599; ';
  } else if (data > '80' && data <= '110') {
    return 'E &#8594; ';
  } else if (data > '110' && data <= '130') {
    return ' E/SE &#8600;';
  } else if (data > '130' && data <= '150') {
    return 'SE &#8600; ';
  } else if (data > '150' && data <= '170') {
    return 'S/SE &#8600; ';
  } else if (data > '170' && data <= '200') {
    return 'S &#8595;';
  } else if (data > '200' && data <= '220') {
    return 'S/SW &#8601; ';
  } else if (data > '220' && data <= '240') {
    return 'SW &#8601; ';
  } else if (data > '240' && data <= '260') {
    return 'W/SW &#8601;';
  } else if (data > '260' && data <= '290') {
    return 'W &#8592;';
  } else if (data > '290' && data <= '310') {
    return 'W/NW &#8598;';
  } else if (data > '310' && data <= '330') {
    return ' NW &#8598;';
  } else if (data > '330' && data <= '350') {
    return ' N/NW &#8598;';
  }
}



function initSearchListener() {
  const searchField = document.getElementById('city-input');
  searchField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      city = searchField.value;
      updateInfo(city, units);
    }
  })

  const searchIcon = document.getElementById('search-icon');
  searchIcon.addEventListener('click', () => {
    city = searchField.value;
      updateInfo(city, units);
  })
  ;
}


function init() {
  initSearchListener();
  initDropdown();
  updateInfo(city, units);
}

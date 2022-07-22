export { getWeather, getWeeklyForecast };
import { displayError} from './ui';
import { city } from './index.js';
const key = 'c4cb26845ca9df5bbedc8d2dc49c8b8c';

async function getWeather() {
  try {
    let response;
    if (city.getMode() === "city") {
    response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.getName()}&units=${city.getUnits()}&appid=${key}`
    );} else if (city.getMode() === "city-state") {

     response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.getName()},${city.getState()}&units=${city.getUnits()}&appid=${key}`
      );
    } else if (city.getMode() === "zipcode") {
      response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${city.getZipCode()}&units=${city.getUnits()}&appid=${key}`)
    }

    return await response.json();
  } catch (error) {
    displayError();
  }
}

async function getWeeklyForecast() {
  try {
    let response;

    if (city.getMode() === "city"){
    response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city.getName()}&units=${city.getUnits()}&appid=${key}`
    );} else if (city.getMode() === "city-state") {
      response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city.getName()},${city.getState()},&us&units=${city.getUnits()}&appid=${key}`
      );
    } else if (city.getMode() === "zipcode") {
      response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?zip=${city.getZipCode()}&units=${city.getUnits()}&appid=${key}`
      );
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

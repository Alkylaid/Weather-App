export { getWeather, getWeeklyForecast };
import { displayError, city, zipCode, state, mode, units } from './ui';
const key = 'c4cb26845ca9df5bbedc8d2dc49c8b8c';

async function getWeather() {
  try {
    let response;
    if (mode === "city") {
    response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${key}`
    );} else if (mode === "city-state") {

     response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&units=${units}&appid=${key}`
      );
    } else if (mode === "zipcode") {
      response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&units=${units}&appid=${key}`)
    }

    return await response.json();
  } catch (error) {
    displayError();
  }
}

async function getWeeklyForecast() {
  try {
    let response;

    if (mode === "city"){
    response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${key}`
    );} else if (mode === "city-state") {
      response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city},${state},&us&units=${units}&appid=${key}`
      );
    } else if (mode === "zipcode") {
      response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&units=${units}&appid=${key}`
      );
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

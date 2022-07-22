export {getWeather, getWeeklyForecast};
import { displayError } from "./ui";
const key = 'c4cb26845ca9df5bbedc8d2dc49c8b8c';



async function getWeather(city, units) {
  try {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${key}`
      )
        
    return await response.json();
  } catch (error) {
    displayError();

  }
}


async function getWeeklyForecast(city, units) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${key}`
          )
            
        return await response.json();
      } catch (error) {
        console.log(error);
      }
    }
    

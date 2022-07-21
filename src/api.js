export {getWeather, getWeeklyForecast};
const key = 'c4cb26845ca9df5bbedc8d2dc49c8b8c';



async function getWeather(city) {
  try {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
      )
        
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}


async function getWeeklyForecast(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`
          )
            
        return await response.json();
      } catch (error) {
        console.log(error);
      }
    }
    
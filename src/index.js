import {getWeather, getWeeklyForecast} from './api.js'

async function updateInfo(city) {
const data = await getWeeklyForecast(city);
console.log(data);
}

updateInfo("Fort Worth");
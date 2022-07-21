import {getWeather, getWeeklyForecast} from './api.js'
import './style.css';
import overcast from './imgs/overcast.jpg';
import sunny from './imgs/sunny.jpg';
import cloudy from './imgs/cloudy.jpg';
import rainy from './imgs/rainy.jpg';
import snowy from './imgs/snowy.jpg';

let units = "imperial";
let city = "Fort Worth";

async function updateInfo(city, units) {
const data = await getWeather(city, units);
console.log(data);
document.getElementById('current-location').innerHTML = data.name;

setWeatherTheme(data.weather[0].main);
document.getElementById('current-temperature').innerHTML = addTempUnits(Math.round(data.main.temp), units);
document.getElementById('current-description').innerHTML = data.weather[0].main
document.getElementById('current-high').innerHTML = `H: ${addTempUnits(Math.round(data.main.temp_max), units)}&nbsp;/&nbsp;`
document.getElementById('current-low').innerHTML = `L: ${addTempUnits(Math.round(data.main.temp_min), units)}`
document.getElementById('current-feel').innerHTML = `Feels Like: ${addTempUnits(Math.round(data.main.feels_like), units)}`
document.getElementById('current-wind-speed').innerHTML = `${data.wind.speed} ${units === "imperial" ? "mph" : "m/s"}`
document.getElementById('current-wind-direction').innerHTML = `${convertWindDirection(data.wind.deg)}`
document.getElementById('current-humidity').innerHTML = `Humidity: ${data.main.humidity}%`
document.getElementById('current-pressure').innerHTML = `Pressure: ${data.main.pressure} mB`
}


function addTempUnits(data, units) {
    switch (units) {
        case "imperial":
            return `${data} °F`
        case "metric":
            return `${data} °C`

    }
}

function setWeatherTheme(data) {
   const icon = document.getElementById('current-weather-icon');
   icon.removeAttribute('class');
   icon.classList.add("fa-solid");
    if (data === "Thunderstorm") {
        icon.classList.add("fa-cloud-bolt");
        document.body.style.background = `url(${rainy}) center center fixed`
    }else if (data === "Drizzle") {
        icon.classList.add("fa-cloud-rain");
        document.body.style.background = `url(${overcast}) center center fixed`
    }else if (data === "Rain") {
        icon.classList.add("fa-cloud-showers-heavy");
        document.body.style.background = `url(${rainy}) center center fixed`
    }else if (data === "Snow") {
        icon.classList.add("fa-snow-flake");
        document.body.style.background = `url(${snowy}) center center fixed`
    }else if (data === "Clouds") {
        icon.classList.add("fa-cloud");
        document.body.style.background = `url(${cloudy}) center center fixed`
    } else {
            icon.classList.add("fa-sun");
            document.body.style.background = `url(${sunny}) center center fixed`
    }
}

function convertWindDirection(data) {
    if (data >= "350" && data <= "360" || data >= "0" && data <= "10") {
        return "&#8593; N";
    } else if (data > "10" && data <= "30") {
        return "&#8599; N/NE"
    } else if (data > "30" && data <= "60") {
        return "&#8599; NE"
    } else if (data >"60" && data <= "80") {
        return "&#8599; E/NE"
    } else if (data >"80" && data <= "110") {
        return "&#8594; E"
    } else if (data >"110" && data <= "130") {
        return "&#8600; E/SE"
    } else if (data > "130" && data <="150") {
        return "&#8600; SE"
    } else if (data > "150" && data <=  "170") {
        return "&#8600; S/SE"
    } else if (data > "170" && data <= "200") {
        return "&#8595; S"
    } else if (data > "200" && data <= "220") {
        return "&#8601; S/SW"
    } else if (data > "220" && data <= "240") {
        return "&#8601; SW"
    } else if (data > "240" && data <= "260") {
        return "&#8601; W/SW"
    } else if (data > "260" && data <= "290") {
        return "&#8592; W"
    } else if (data > "290" && data <= "310") {
        return "&#8598; W/NW"
    } else if (data > "310" && data <= "330") {
        return "&#8598; NW"
    } else if (data > "330" && data <= "350") {
        return "&#8598; N/NW";
    }
}

function switchUnits(input) {
    units = input;
    updateInfo(city, units);
}

const unitOption = document.getElementById('unit-select');

unitOption.addEventListener('change', () => {
    switchUnits(unitOption.value);
});

const cityField = document.getElementById('city');

cityField.addEventListener('keydown', event => {

    if (event.key === "Enter") {
        city = cityField.value;
        updateInfo(city, units);
    }
});


updateInfo(city, units);
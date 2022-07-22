export { addTempUnits, convertDate, parseString, convertWindDirection};
import { format, parseISO } from 'date-fns';
import {city, state, zipCode, mode} from './ui.js'

function addTempUnits(data, units) {
  switch (units) {
    case 'imperial':
      return `${data} °F`;
    case 'metric':
      return `${data} °C`;
  }
}

function convertDate(date, formats) {
  const newDate = parseISO(date);
  if (formats === 'days') {
    return format(newDate, 'eeee');
  } else {
    return format(newDate, 'M/dd');
  }
}

function parseString(string) {
    const entries = string.split(',');
    if (entries.length === 2) {
        city = entries[0];
        state = entries[1].replace(/\s+/g, '');
        mode = "city-state"
    } else if (entries.length === 1) {
        if (/\d/.test(entries[0])) {
            zipCode = entries[0];
            mode = "zipcode";
        } else {
            city = entries[0];
            mode = "city";
        }
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
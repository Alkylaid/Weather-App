export {addTempUnits, convertDate};
import {format, parseISO} from 'date-fns'

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
    if (formats === "days") {
        return format(newDate, 'eeee');
    } else {
    return format(newDate, 'M/dd');}
}
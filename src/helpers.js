export {addTempUnits};

function addTempUnits(data, units) {
  switch (units) {
    case 'imperial':
      return `${data} °F`;
    case 'metric':
      return `${data} °C`;
  }
}
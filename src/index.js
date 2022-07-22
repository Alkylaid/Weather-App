
import {init} from './ui.js';
import './style.css';
export {city};

function newCity() {
  let units = 'imperial';
  let cityName = 'Los Angeles';
  let state;
  let zipCode;
  let mode = 'city';

  return{
      getName() {
          return cityName
      },
      getUnits() {
          return units
      },
      getState() {
          return state
      },
      getZipCode() {
          return zipCode
      },
      getMode() {
          return mode
      },
      setName(name) {
          cityName = name
      },
      setUnits(newunit) {
          units = newunit
      },
      setState(newstate) {
          state = newstate;
      },
      setZip(newzip) {
          zipCode = newzip;
      },
      setMode(newmode) {
          mode = newmode;
      }
  
  }
  
}
const city = newCity();


(function load() {
  init();
})();




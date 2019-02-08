import React from 'react';

import iconDictionary from './iconDictionary';

export default function WeatherForecast(props) {
  const forecastData = props.forecast.slice(1,6);
  console.log(forecastData);

  // Date stuff
  const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  const todayDate = new Date();
  const currentDayDigit = todayDate.getDay();

  function getCurrentDay(digit) {
    return days[digit];
  }

  // Forecast display
  const forecastDisplay = forecastData.map((day, i) => {
    const { time, icon, temperatureHigh } = day;
    const temperature = Math.round(temperatureHigh);
    const currentIconClass = "wi " + iconDictionary[icon];
    
    return (
      <td key={time}>
        <div className="forecast-day">{ getCurrentDay((currentDayDigit + i + 1) % 7) }</div>
        <div className="forecast-icon"><i className={ currentIconClass }></i></div>  
        <div className="forecast-temp">{ temperature }&#176;</div>
      </td>
    );
  });

  return (
    <div>
      <table className="forecast-display">
        <tbody>
          <tr>
            { forecastDisplay }
          </tr>
        </tbody>
      </table>
    </div>
  )
}

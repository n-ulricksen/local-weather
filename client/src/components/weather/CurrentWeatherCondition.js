import React from 'react';

import iconDictionary from './iconDictionary';

export default function CurrentWeatherCondition(props) {
  const { condition, icon } = props;
  const currentIconClass = "wi " + iconDictionary[icon];

  return (
    <div>
      <div className="current-weather-display">
        <div id="current-condition">{ condition }</div>
        <i className={ currentIconClass }></i>
      </div>
    </div>
  )
}

import React, { Component } from 'react';
import axios from 'axios';

import CurrentTempDisplay from './CurrentTempDisplay';
import CurrentWeatherCondition from './CurrentWeatherCondition';
import WeatherForecast from './WeatherForecast';

import './Weather.css';

class Weather extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userCoords: {
        latitude: 0,
        longitude: 0
      }
    };
  }

  // Get user's location and passes userCoords object to callback function
  getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
          const userCoords = { latitude, longitude };

          resolve(userCoords);
        });
      } else {
        reject(Error('Your browser does not support navigator.geolocation'));
      }
    });
  };

  // Retrieve weather data using coordinates(lat,long)
  async getWeatherData (coords) {
    const { latitude, longitude } = coords;
    const weatherUrl = `/api/weather/current/${latitude}/${longitude}`;
    
    return await axios.get(weatherUrl);
  }

  componentDidMount() {
    this.getUserLocation()
      .then(userCoords => {
        this.getWeatherData(userCoords)
          .then(res => {
            const { currently, daily, hourly } = res.data;
            
            const { temperature, summary: currentCondition, icon: currentIcon } = currently;
            const { summary } = hourly;
            const { data: forecast, summary: forecastSummary } = daily;
            // console.log(res.data);

            this.setState({
              temperature, currentCondition, currentIcon, forecast, forecastSummary, summary
            });
          })
          .catch(err => console.log(err.response));
      })
      .catch(err => console.log(err.response));
  }

  render() {
    const { temperature, currentCondition, currentIcon, forecast, forecastSummary, summary } = this.state;

    return (
      <div className="Weather">
        {
          !temperature
            ? <div className="loading">Loading...</div> 
            : (
              <React.Fragment>
                {/* Current Temperature/Date */}
                <CurrentTempDisplay temperature={ temperature } />

                {/* Current Weather Condition */}
                <CurrentWeatherCondition 
                  condition={ currentCondition }
                  icon={ currentIcon } 
                />

                {/* Weather Forecast */}
                <WeatherForecast forecast={ forecast } />

                {/* Summary */}
                <p className="summary">{ summary } { forecastSummary }</p>
              </React.Fragment>
            )
        }
      </div>
    );
  }
}

export default Weather;
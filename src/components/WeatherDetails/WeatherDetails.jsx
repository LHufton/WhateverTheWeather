import React from 'react'
import useWeatherData from './useWeatherData'
import { API_KEY, kelvinToFahrenheit } from '../../utils'
// import weatherImages from '../../weatherIcons'
import './WeatherDetails.css'
import { getWeatherIcon, getDayNightIcon } from '../../weatherIcons'

const WeatherDetails = ({ city }) => {
  const { weatherData, error } = useWeatherData(city, API_KEY)

  if (error) return <p>{error}</p>
  if (!weatherData) return null

  const weatherIcon = getWeatherIcon(
    weatherData.weather[0].main,
    weatherData.weather[0].description
  )
  const dayNightIcon = getDayNightIcon(
    weatherData.sys.sunrise,
    weatherData.sys.sunset
  )

  return (
    <div className="weather-details">
      <div className="current-weather">
        <img src={weatherIcon} alt="Weather condition" />
        <img src={dayNightIcon} alt="Day or Night" />
        <p>
          Temperature: {kelvinToFahrenheit(weatherData.main.temp).toFixed(2)} °F
        </p>
        <p>Description: {weatherData.weather[0].description}</p>
      </div>
    </div>
  )
}

export default WeatherDetails

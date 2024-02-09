import React, { useEffect, useState } from 'react'
import useWeatherData from './useWeatherData'
import { API_KEY, kelvinToFahrenheit } from '../../utils'
import './WeatherDetails.css'
import { getWeatherIcon, getDayNightIcon } from '../../WeatherIcons'

const WeatherDetails = ({ city, onDataFetched }) => {
  const { weatherData, error } = useWeatherData(city, API_KEY)
  const [dataFetched, setDataFetched] = useState(false)

  useEffect(() => {
    if (weatherData && !dataFetched) {
      onDataFetched()
      setDataFetched(true)
    }
  }, [weatherData, onDataFetched, dataFetched])

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
        <h2>{city}</h2>
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

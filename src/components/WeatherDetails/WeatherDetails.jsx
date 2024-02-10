import React, { useEffect, useState } from 'react'
import useWeatherData from './useWeatherData'
import { API_KEY, kelvinToFahrenheit } from '../../utils'
import { getWeatherIcon } from '../../WeatherIcons'
import './WeatherDetails.css'

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
  const currentCondition = weatherData.weather[0]
  const iconSrc = getWeatherIcon(
    currentCondition.main,
    currentCondition.description
  )

  return (
    <div className="weather-details">
      <div className="current-weather">
        <h2>{city}</h2>
        <img src={iconSrc} alt="Weather image" />
        <p>Temp: {kelvinToFahrenheit(weatherData.main.temp).toFixed(2)} °F</p>
        <p>
          Feels Like:{' '}
          {kelvinToFahrenheit(weatherData.main.feels_like).toFixed(2)} °F
        </p>
        <p>Humidity: {weatherData.main.humidity}%</p>
        <p>{currentCondition.description}</p>
        {/* <p> {weatherData.weather[0].description}</p> */}
      </div>
    </div>
  )
}

export default WeatherDetails

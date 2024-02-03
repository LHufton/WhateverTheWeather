import React, { useState, useEffect } from 'react'
import { API_KEY } from '../../utils' 
import weatherData from './useWeatherData' /
import { fetchWeatherData, kelvinToFahrenheit } from '../../utils' // Import utility functions
import { getWeatherIcon, getDayNightIcon } from '../../weatherIcons' 
import './WeatherDetails.css'

const WeatherDetails = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState('')
  const [weatherImage, setWeatherImage] = useState('')
  const [dayNightImage, setDayNightImage] = useState('')

  useEffect(() => {
    if (city) {
      fetchWeatherData(city, API_KEY)
        .then((data) => {
          setWeatherData(data)
          setWeatherImage(
            getWeatherIcon(data.weather[0].main, data.weather[0].description)
          )
          setDayNightImage(getDayNightIcon(data.sys.sunrise, data.sys.sunset))
          setError('')
        })
        .catch((error) => {
          setError(
            'Failed to fetch weather data. Check your network or API key.'
          )
          console.error(error) // Log the error for debugging
        })
    }
  }, [city])

  return (
    <div>
      {error && <p>{error}</p>}
      {weatherData && (
        <div className="current-weather">
          <img src={weatherImage} alt="Weather condition" />
          <img src={dayNightImage} alt={dayNightImage ? 'Day' : 'Night'} />
          <p>
            Temperature: {kelvinToFahrenheit(weatherData.main.temp).toFixed(2)}
            °F
          </p>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  )
}

export default WeatherDetails

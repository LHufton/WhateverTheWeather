// useWeatherData.js
import { useState, useEffect } from 'react'
import { fetchWeatherData } from './utils' // Import your utility function

const useWeatherData = (city, apiKey) => {
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (city) {
      fetchWeatherData(city, apiKey)
        .then((data) => {
          setWeatherData(data)
          setError('')
        })
        .catch((err) => {
          setError('Failed to fetch weather data')
          console.error(err)
        })
    }
  }, [city, apiKey])

  return { weatherData, error }
}

export default useWeatherData

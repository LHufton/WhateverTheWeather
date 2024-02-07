// useWeatherData.js
import { useState, useEffect } from 'react'
import { fetchWeatherData } from '../../utils' // Import your utility function

const useWeatherData = (city, apiKey) => {
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (city) {
      console.log(
        `Fetching weather data for city: ${city} with API key: ${apiKey}`
      )
      fetchWeatherData(city, apiKey)
        .then((data) => {
          console.log('API Response:', data)
          setWeatherData(data)
          setError('')
        })
        .catch((err) => {
          console.error('API Call Error:', err)
          setError('Failed to fetch weather data')
          console.error(err)
        })
    }
  }, [city, apiKey])

  return { weatherData, error }
}

export default useWeatherData

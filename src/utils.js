import axios from 'axios'
export const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export const fetchWeatherData = async (city, apiKey) => {
  console.log(`Fetching weather data for city: ${city} with API key: ${apiKey}`) // Log the API call
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: apiKey
      }
    })
    console.log('API Response:', response.data) // Log the API response data
    return response.data
  } catch (error) {
    console.error('API Call Error:', error) // Log any errors
    throw error // Rethrow the error so it can be handled by the caller
  }
}

export const kelvinToFahrenheit = (kelvin) => {
  return ((kelvin - 273.15) * 9) / 5 + 32
}

export const API_KEY = import.meta.env.VITE_API_KEY

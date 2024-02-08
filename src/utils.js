import axios from 'axios'

export const BASE_URL = 'https://api.openweathermap.org/data/2.5'
export const API_KEY = import.meta.env.VITE_API_KEY

export const fetchWeatherData = async (city, apiKey) => {
  const source = axios.CancelToken.source()
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: apiKey
      },
      cancelToken: source.token
    })
    return response.data
  } catch (error) {
    if (!axios.isCancel(error)) {
      console.error('API Call Error:', error)
    }
    throw error
  }
  return source
}

export const kelvinToFahrenheit = (kelvin) => {
  return ((kelvin - 273.15) * 9) / 5 + 32
}

export const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export const fetchWeatherData = async (city, apiKey) => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      appid: apiKey
    }
  })
  return response.data
}

export const kelvinToFahrenheit = (kelvin) => {
  return ((kelvin - 273.15) * 9) / 5 + 32
}

export const API_KEY = import.meta.env.VITE_API_KEY

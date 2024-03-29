import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL, API_KEY } from '../../utils'
import { getWeatherIcon, getPredominantCondition } from '../../WeatherIcons'
import './ForecastList.css'

const ForecastList = ({ city }) => {
  const [dailyForecasts, setDailyForecasts] = useState([])

  useEffect(() => {
    if (city) {
      const getForecastList = async () => {
        const response = await axios.get(`${BASE_URL}/forecast`, {
          params: {
            q: city,
            appid: API_KEY,
            units: 'imperial'
          }
        })

        const forecasts = response.data.list.reduce((acc, forecast) => {
          const date = new Date(forecast.dt * 1000).toDateString()
          if (!acc[date]) {
            acc[date] = []
          }
          acc[date].push(forecast)
          return acc
        }, {})

        const dailyData = Object.entries(forecasts)
          .map(([date, dailyForecast]) => {
            const predominantCondition = getPredominantCondition(dailyForecast)
            const icon = getWeatherIcon(predominantCondition, '')

            // Calculate average feels_like and humidity for the day
            const avgFeelsLike =
              dailyForecast.reduce(
                (acc, curr) => acc + curr.main.feels_like,
                0
              ) / dailyForecast.length
            const avgHumidity =
              dailyForecast.reduce((acc, curr) => acc + curr.main.humidity, 0) /
              dailyForecast.length

            return {
              date,
              icon,
              maxTemp: Math.max(...dailyForecast.map((f) => f.main.temp_max)),
              minTemp: Math.min(...dailyForecast.map((f) => f.main.temp_min)),
              feelsLike: avgFeelsLike,
              humidity: avgHumidity
            }
          })
          .slice(0, 5)

        setDailyForecasts(dailyData)
      }
      getForecastList()
    }
  }, [city])

  return (
    <div className="forecast">
      <div className="auto-grid-small">
        {dailyForecasts.map(
          ({ date, icon, maxTemp, minTemp, feelsLike, humidity }) => (
            <div key={date} className="forecast-day">
              <h3>{date}</h3>
              <img src={icon} alt="Weather icon" />
              <div className="temp">
                <p>High: {maxTemp.toFixed(2)}°F</p>
                <p>Low: {minTemp.toFixed(2)}°F</p>
                <p>Feels Like: {feelsLike.toFixed(2)}°F</p>
                <p>Humidity: {humidity.toFixed(2)}%</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default ForecastList

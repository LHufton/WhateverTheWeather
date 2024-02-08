import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL, API_KEY } from '../../utils'
import { getWeatherIcon } from '../../WeatherIcons' // Adjust the import path as necessary
import './ForecastList.css'

const ForecastList = ({ city }) => {
  const [dailyForecasts, setDailyForecasts] = useState({})

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

        const aggregatedByDay = response.data.list.reduce((acc, forecast) => {
          const dateObj = new Date(forecast.dt * 1000)
          const date = dateObj.toLocaleDateString()
          const day = dateObj.toLocaleDateString('en-US', { weekday: 'long' })
          const dateString = `${day}, ${date}`

          if (!acc[dateString]) {
            acc[dateString] = {
              min: forecast.main.temp_min,
              max: forecast.main.temp_max,
              conditions: new Set([forecast.weather[0].description]),
              humidity: forecast.main.humidity,
              windSpeed: forecast.wind.speed,
              icon: getWeatherIcon(
                forecast.weather[0].main,
                forecast.weather[0].description
              )
            }
          } else {
            acc[dateString].min = Math.min(
              acc[dateString].min,
              forecast.main.temp_min
            )
            acc[dateString].max = Math.max(
              acc[dateString].max,
              forecast.main.temp_max
            )
            acc[dateString].conditions.add(forecast.weather[0].description)
            acc[dateString].humidity = Math.max(
              acc[dateString].humidity,
              forecast.main.humidity
            )
            acc[dateString].windSpeed = Math.max(
              acc[dateString].windSpeed,
              forecast.wind.speed
            )
            // Update the icon if necessary based on new conditions
            acc[dateString].icon = getWeatherIcon(
              forecast.weather[0].main,
              forecast.weather[0].description
            )
          }
          return acc
        }, {})

        setDailyForecasts(aggregatedByDay)
      }
      getForecastList()
    }
  }, [city])

  return (
    <div className="forecast">
      <div className="auto-grid-small">
        {Object.keys(dailyForecasts).map((dateString) => {
          const dayData = dailyForecasts[dateString]

          return (
            <div key={dateString} className="forecast-day">
              <h3>{dateString}</h3>
              <img
                src={dayData.icon}
                alt={Array.from(dayData.conditions).join(', ')}
              />
              <p>High: {dayData.max.toFixed(2)}°F</p>
              <p>Low: {dayData.min.toFixed(2)}°F</p>
              <p>Humidity: {dayData.humidity}%</p>
              <p>Wind Speed: {dayData.windSpeed.toFixed(2)} mph</p>
              <p>Conditions: {Array.from(dayData.conditions).join(', ')}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ForecastList

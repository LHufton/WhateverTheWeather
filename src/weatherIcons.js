import dayIcon from './assets/day.svg'
import nightIcon from './assets/night.svg'
import rainyImage from './assets/rainy-7.svg'
import snowyImage from './assets/snowy-1.svg'
import thunderImage from './assets/thunder.svg'
import cloudyImage from './assets/cloudy.svg'
import defaultImage from './assets/weather.svg'

export const weatherImages = {
  Rain: rainyImage,
  Snow: snowyImage,
  Thunderstorm: thunderImage,
  Clouds: cloudyImage,
  Clear: defaultImage
  // default: defaultImage
}

export const getWeatherIcon = (condition, description) => {
  if (
    description.toLowerCase().includes('rain') ||
    description.toLowerCase().includes('drizzle')
  ) {
    return rainyImage
  } else if (description.toLowerCase().includes('snow')) {
    return snowyImage
  } else if (description.toLowerCase().includes('thunder')) {
    return thunderImage
  } else if (description.toLowerCase().includes('cloud')) {
    return cloudyImage
  } else {
    return weatherImages[condition] || defaultImage
  }
}

export const getDayNightIcon = (sunrise, sunset) => {
  const currentTime = new Date().getTime() / 1000
  return currentTime >= sunrise && currentTime < sunset ? dayIcon : nightIcon
}

export const getPredominantCondition = (dailyForecast) => {
  const conditionCounts = dailyForecast.reduce((acc, forecast) => {
    const mainCondition = forecast.weather[0].main
    acc[mainCondition] = (acc[mainCondition] || 0) + 1
    return acc
  }, {})

  let predominantCondition = ''
  let maxCount = 0
  Object.entries(conditionCounts).forEach(([condition, count]) => {
    if (count > maxCount) {
      predominantCondition = condition
      maxCount = count
    }
  })

  return predominantCondition
}

import './App.css'
import { useState } from 'react'
import Search from './components/Search/Search'
import ForecastList from './components/ForecastList/ForecastList'
import WeatherDetails from './components/WeatherDetails/WeatherDetails'

const App = () => {
  const [city, setCity] = useState('')
  const [isFetching, setIsFetching] = useState(false)

  const handleCitySearch = (cityName) => {
    setCity(cityName)
    setIsFetching(true)
  }

  return (
    <div>
      <Search handleCitySearch={handleCitySearch} isFetching={isFetching} />
      <WeatherDetails city={city} setIsFetching={setIsFetching} />
      <ForecastList city={city} />
    </div>
  )
}

export default App

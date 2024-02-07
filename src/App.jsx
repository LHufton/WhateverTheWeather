import './App.css'
import { useState } from 'react'
import Search from './components/Search/Search'
import ForecastList from './components/ForecastList/ForecastList'
import WeatherDetails from './components/WeatherDetails/WeatherDetails'

const App = () => {
  const [city, setCity] = useState('')

  const handleCitySearch = (cityName) => {
    setCity(cityName)
  }

  return (
    <div>
      <Search handleCitySearch={handleCitySearch} />
      <WeatherDetails city={city} />
      <ForecastList />
    </div>
  )
}

export default App

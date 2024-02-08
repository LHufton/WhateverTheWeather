import React, { useState, useCallback } from 'react' // Import useCallback
import Search from './components/Search/Search'
import WeatherDetails from './components/WeatherDetails/WeatherDetails'
import ForecastList from './components/ForecastList/ForecastList'

const App = () => {
  const [city, setCity] = useState('')
  const [isFetching, setIsFetching] = useState(false)

  const handleCitySearch = useCallback((cityName) => {
    setCity(cityName)
    setIsFetching(true)
  }, [])

  const onDataFetched = useCallback(() => {
    setIsFetching(false) // Ensure fetching state is reset after each operation
  }, [])

  return (
    <div>
      <Search handleCitySearch={handleCitySearch} isFetching={isFetching} />
      <WeatherDetails city={city} onDataFetched={onDataFetched} />
      <ForecastList city={city} />
    </div>
  )
}

export default App

import React, { useState } from 'react'
import './Search.css'

const Search = ({ handleCitySearch, isFetching }) => {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    handleCitySearch(inputValue)
    setInputValue('') // Optionally clear the input after search
  }

  return (
    <div className="App">
      <h2>Whatever the Weather</h2>
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          className="search-bar-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter City"
          disabled={isFetching} // Consider the necessity and correctness of this
        />
      </form>
    </div>
  )
}
export default Search

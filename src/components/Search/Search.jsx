import React from 'react'
import './Search.css'

const Search = () => {
  return (
    <div className="App">
      <h2>Whatever the Weather</h2>
      <form onSubmit={handleCitySearch} className="search-bar">
        <input
          className="search-bar-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter City"
        />
      </form>
    </div>
  )
}

export default Search

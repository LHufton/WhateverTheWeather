import React, { useState } from 'react'
import './Search.css'

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

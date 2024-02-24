import React, { useState } from 'react'

function SearchBar({ onCityChange, onLatChange, onLongChange }) {
  const [cityName, setCityName] = useState('')
  const [lat, setLat] = useState('')
  const [long, setLong] = useState('')

  const handleFormSubmit = (e) => {
    console.log(`e: ${e}`)
    e.preventDefault()
    onCityChange(cityName)
    // setCityName('')
    onLatChange(lat)
    onLongChange(long)
    // setCityName(e.target.value)
    // onCityChange(e.target.value)
    // setCityName('')
  }

  const handleClear = (e) => {
    setCityName('')
    setLat('')
    setLong('')
  }
  return (
    <div className="bg-slate-100 rounded-xl p-8 dark:bg-slate-800">
      <form onSubmit={handleFormSubmit}>
        <label
          htmlFor="city"
          className="block text-sm font-medium text-gray-500"
        >
          City Name
        </label>
        <input
          type="text"
          id="city"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <div className="mt-4 flex justify-center">
          <p className="block text-sm font-medium text-gray-100">OR</p>
        </div>
        <div className="flex justify-between space-x-5">
          <div className="mt-4">
            <label
              htmlFor="longitude"
              className="block text-sm font-medium text-gray-500"
            >
              Longitude
            </label>
            <input
              type="text"
              id="longitude"
              value={long}
              onChange={(e) => setLong(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="latitude"
              className="block text-sm font-medium text-gray-500"
            >
              Latitude
            </label>
            <input
              type="text"
              id="latitude"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <button
            type="button"
            onClick={handleClear}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Clear
          </button>
          <button
            type="submit"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchBar

import { useEffect, useState } from 'react'
import './App.css'

const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY
const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Miami", "Phoenix", "Seattle", "Denver", "Atlanta", "Boston"]

function App() {
  const [weatherData, setWeatherData] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [tempFilter, setTempFilter] = useState("All")

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const responses = await Promise.all(
          cities.map(city =>
            fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${API_KEY}`)
              .then(res => res.json())
          )
        )
        const data = responses.map(res => res.data[0])
        setWeatherData(data)
      } catch (error) {
        console.error("Error fetching weather data", error)
      }
    }

    fetchWeather()
  }, [])

  const filteredData = weatherData
  .filter(item => {
    const temp = item.temp
    switch (tempFilter) {
      case "VeryCold":
        return temp < 32
      case "Cold":
        return temp >= 32 && temp < 60
      case "Mild":
        return temp >= 60 && temp <= 75
      case "Warm":
        return temp > 75 && temp <= 85
      case "Hot":
        return temp > 85
      default:
        return true // "All" case
    }
  })
    
  .filter(item => item.city_name.toLowerCase().includes(searchQuery.toLowerCase()))

  const avgTemp = (weatherData.reduce((sum, item) => sum + item.temp, 0) / weatherData.length).toFixed(1)
  const maxHumidity = Math.max(...weatherData.map(item => item.rh))

  return (
    <div className="App">
      <h1>Weather Dashboard</h1>

<div className="Search" > 
      {/* Search + Filter */}
      <input
        type="text"
        placeholder="Search city..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

  <select value={tempFilter} onChange={(e) => setTempFilter(e.target.value)}>
    <option value="All">All Temperatures</option>
    <option value="VeryCold">Very Cold (&lt; 32°F)</option>
    <option value="Cold">Cold (32–59°F)</option>
    <option value="Mild">Mild (60–75°F)</option>
    <option value="Warm">Warm (76–85°F)</option>
    <option value="Hot">Hot (&gt; 85°F)</option>
  </select>

</div>
      {/* Stats */}
      <div className=" stats">
        <p>Total Cities: {weatherData.length}</p>
        <p>Average Temp: {avgTemp}°F</p>
        <p>Highest Humidity: {maxHumidity}%</p>
      </div>

      {/* Weather Cards */}
      <div className="weather-grid">
        {filteredData.map((item) => (
          <div key={item.city_name} className="card">
            <h3>{item.city_name}</h3>
            <p>{item.weather.description}</p>
            <p>Temp: {item.temp}°F</p>
            <p>Humidity: {item.rh}%</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App


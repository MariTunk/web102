import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Miami", "Phoenix", "Seattle", "Denver", "Atlanta", "Boston"];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#845EC2', '#FF6F91'];

function HumidityPieChart({ data }) {
  if (!data.length) return null;

  return (
    <div>
      <h3>Humidity Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="rh"
            nameKey="city_name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function Dashboard() {
  const [weatherData, setWeatherData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tempFilter, setTempFilter] = useState("All");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const responses = await Promise.all(
          cities.map(city =>
            fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${API_KEY}`)
              .then(res => res.json())
          )
        );
        const data = responses.map(res => res.data?.[0]).filter(Boolean);
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data", error);
      }
    };

    fetchWeather();
  }, []);

  const filteredData = weatherData
    .filter(item => {
      const temp = item.temp;
      switch (tempFilter) {
        case "VeryCold": return temp < 32;
        case "Cold": return temp >= 32 && temp < 60;
        case "Mild": return temp >= 60 && temp <= 75;
        case "Warm": return temp > 75 && temp <= 85;
        case "Hot": return temp > 85;
        default: return true;
      }
    })
    .filter(item => item.city_name.toLowerCase().includes(searchQuery.toLowerCase()));

  const avgTemp = weatherData.length > 0
    ? (weatherData.reduce((sum, item) => sum + item.temp, 0) / weatherData.length).toFixed(1)
    : "N/A";

  const maxHumidity = weatherData.length > 0
    ? Math.max(...weatherData.map(item => item.rh))
    : "N/A";

  const tempData = weatherData.map(item => ({
    name: item.city_name,
    temp: item.temp
  }));

  const humidityData = weatherData.map(item => ({
    city_name: item.city_name,
    rh: item.rh
  }));

  return (
    <div>
      <h1>Weather Dashboard</h1>

      {/* Search + Filter */}
      <div className="Search">
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
      <div className="stats">
        <p>Total Cities: {weatherData.length}</p>
        <p>Average Temp: {avgTemp}°F</p>
        <p>Highest Humidity: {maxHumidity}%</p>
      </div>

      <div className="dashboard-layout">
        {/* Weather Cards */}
        <div className="weather-grid">
          {filteredData.map((item) => (
            <Link
              to={`/city/${encodeURIComponent(item.city_name)}`}
              key={item.city_name}
              className="card"
            >
              <h3>{item.city_name}</h3>
              <p>{item.weather.description}</p>
              <p>Temp: {item.temp}°F</p>
              <p>Humidity: {item.rh}%</p>
            </Link>
          ))}
        </div>

        {/* Charts */}
        <div className="charts">
          {tempData.length > 0 && (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tempData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="temp" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          )}
          <HumidityPieChart data={humidityData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

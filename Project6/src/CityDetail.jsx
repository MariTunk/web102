import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function CityDetail() {
  const { cityName } = useParams();
  const [cityData, setCityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCityData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://api.weatherbit.io/v2.0/current?city=${cityName}&key=${API_KEY}`);
        if (!res.ok) throw new Error(`Failed to fetch data for ${cityName}`);
        const data = await res.json();
        setCityData(data.data?.[0] || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCityData();
  }, [cityName]);

  if (loading) return <p>Loading weather details for {cityName}...</p>;

  if (error || !cityData) {
    return (
      <div className="error-card">
        <p>{error ? `Error: ${error}` : `No data found for ${cityName}`}</p>
        <Link to="/" className="back-button">← Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="city-detail">
      <Link to="/" className="back-button">← Back to Dashboard</Link>
      <h2>{cityData.city_name} Details</h2>
      <ul>
        <li><strong>Weather:</strong> {cityData.weather.description}</li>
        <li><strong>Temperature:</strong> {cityData.temp}°F</li>
        <li><strong>Humidity:</strong> {cityData.rh}%</li>
        <li><strong>Wind Speed:</strong> {cityData.wind_spd} m/s</li>
        <li><strong>Pressure:</strong> {cityData.pres} mb</li>
        <li><strong>Cloud Coverage:</strong> {cityData.clouds}%</li>
      </ul>
    </div>
  );
}

export default CityDetail;

import { useState } from 'react'
import './App.css'

const API_URL = "https://api.thecatapi.com/v1/images/search"
const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY

export default function App() {
  const [currentCat, setCurrentCat] = useState(null)
  const [banList, setBanList] = useState([])
  const [queryParams] = useState("include_breeds=true")

  const getRandomCat = async () => {
    let tries = 0
    let cat = null

    try {
      while (tries < 10) {
        const res = await fetch(`${API_URL}?${queryParams}`, {
          headers: {
            'x-api-key': API_KEY
          }
        })

        const data = await res.json()
        const result = data[0]
        const breed = result?.breeds?.[0]

        if (!breed) {
          tries++
          continue
        }

        const breedName = breed.name || "Unknown"
        const origin = breed.origin || "Unknown"
        const temperament = breed.temperament?.split(",")[0].trim() || "Unknown"

        // If any of the values are banned, skip this result
        if (
          banList.includes(breedName) ||
          banList.includes(origin) ||
          banList.includes(temperament)
        ) {
          tries++
          continue
        }

        cat = {
          url: result.url,
          breedName,
          origin,
          temperament,
        }

        break
      }

      setCurrentCat(cat)
    } catch (error) {
      console.error("Error fetching cat:", error)
    }
  }

  const toggleBan = (value) => {
    setBanList((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    )
  }

  return (
    <div className="app-container">
      <div className="header">
        <h1>🐱 Cat Explorer</h1>
        <p>Click the button to fetch a random cat. Click a value to ban/unban it.</p>

         <button onClick={getRandomCat}> Discover </button>
      </div>
      
      <div className="main-layout">
        <div className="cat-section">
          {currentCat && (
            <div className="cat-card">
              <img src={currentCat.url} alt="Random Cat" className="cat-image" />
  
              <p>
                <strong>Breed:</strong>{" "}
                <span className="clickable" onClick={() => toggleBan(currentCat.breedName)}>
                  {currentCat.breedName}
                </span>
              </p>
  
              <p>
                <strong>Origin:</strong>{" "}
                <span className="clickable" onClick={() => toggleBan(currentCat.origin)}>
                  {currentCat.origin}
                </span>
              </p>
  
              <p>
                <strong>Temperament:</strong>{" "}
                <span className="clickable" onClick={() => toggleBan(currentCat.temperament)}>
                  {currentCat.temperament}
                </span>
              </p>
            </div>
          )}
  
        
        </div>
  
        <div className="ban-sidebar">
          <h2>Ban List</h2>
          <p>Click to unban any item:</p>
          <ul>
            {banList.map((value, index) => (
              <li key={index} className="clickable" onClick={() => toggleBan(value)}>
                {value}
              </li>
            ))}
          </ul>
          {banList.length > 0 && (
            <button onClick={() => setBanList([])}>Clear Ban List</button>
          )}
        </div>
      </div>
    </div>
  )
  
 
}

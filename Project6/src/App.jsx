import { Routes, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import CityDetail from "./CityDetail"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/city/:cityName" element={<CityDetail />} />
      </Routes>
    </div>
  )
}

export default App

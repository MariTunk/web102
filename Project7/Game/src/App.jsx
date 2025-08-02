import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateCrew from './pages/CreateCrew.jsx';
import ReadCrew from './pages/ReadCrew.jsx';
import ViewCrew from './pages/ViewCrew.jsx';
import UpdateCrew from './pages/UpdateCrew.jsx';
import './App.css';

function NotFound() {
  return (
    <div>
      <h2>404 - Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/">Go back home</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <h1>Space Crew Management</h1>
          <p>You can create your very own set of superheros before sending them off to save the world!</p>
          <nav>
            <Link to="/">Home</Link> |{' '}
            <Link to="/create">Create Crewmate</Link> |{' '}
            <Link to="/crewmate/1/edit">Edit Crewmate</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<ReadCrew />} />
            <Route path="/create" element={<CreateCrew />} />
            <Route path="/crewmate/:id" element={<ViewCrew />} />
            <Route path="/crewmate/:id/edit" element={<UpdateCrew />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

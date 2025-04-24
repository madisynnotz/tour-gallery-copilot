import React, { useEffect, useState } from 'react';
import './App.css';
import Gallery from './components/Gallery';

function App() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch tour data from the API
  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://cors-anywhere.herokuapp.com/https://course-api.com/react-tours-project');
      if (!response.ok) {
        throw new Error('Failed to fetch tours');
      }
      const data = await response.json();
      setTours(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(true);
      setLoading(false);
    }
  };

  // Run once when the app first loads
  useEffect(() => {
    fetchTours();
  }, []);

  // Remove a tour by ID
  const removeTour = (id) => {
    const filteredTours = tours.filter((tour) => tour.id !== id);
    setTours(filteredTours);
  };

  // Conditional rendering for different app states
  if (loading) {
    return (
      <main>
        <h2>Loading...</h2>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <h2>Something went wrong. Please try again later.</h2>
      </main>
    );
  }

  if (tours.length === 0) {
    return (
      <main>
        <h2>No tours left</h2>
        <button className="btn" onClick={fetchTours}>
          Refresh
        </button>
      </main>
    );
  }

  // Normal state: show tour gallery
  return (
    <main>
      <h1>Tour Gallery</h1>
      <Gallery tours={tours} onRemove={removeTour} />
    </main>
  );
}

export default App;
import React, { useEffect, useState } from 'react';
import './App.css';
import Gallery from './components/Gallery'; // Import your Gallery component

function App() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Function to fetch tour data from the API
  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://course-api.com/react-tours-project');
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

  // Run fetchTours() once when the app first loads
  useEffect(() => {
    fetchTours();
  }, []);

  // This gets called when a user clicks "Not Interested"
  const removeTour = (id) => {
    // Filter out the tour with the matching ID
    const updatedTours = tours.filter((tour) => tour.id !== id);
    setTours(updatedTours);
  };

  // Loading state
  if (loading) {
    return <h2>Loading...</h2>;
  }

  //  Error state
  if (error) {
    return <h2>Oops! Something went wrong while fetching tours.</h2>;
  }

  // 🧹 If all tours are removed, offer a refresh button
  if (tours.length === 0) {
    return (
      <main>
        <h2>No tours left</h2>
        <button className="btn" onClick={fetchTours}>Refresh</button>
      </main>
    );
  }

  // ✅ Normal render — pass tours and removeTour down to Gallery
  return (
    <main>
      <h1>Tour Gallery</h1>
      <Gallery tours={tours} onRemove={removeTour} />
    </main>
  );
}

export default App;



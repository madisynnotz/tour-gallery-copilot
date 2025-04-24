import React, { useEffect, useState } from 'react';
import './App.css';

// Main App component
function App() {
  // State to store the tour data we get from the API
  const [tours, setTours] = useState([]);

  // State to track if data is still loading
  const [loading, setLoading] = useState(true);

  // State to track if an error happens during fetch
  const [error, setError] = useState(false);

  // useEffect runs only once (on component mount) to fetch the data
  useEffect(() => {
    const fetchTours = async () => {
      // Start loading
      setLoading(true);
      try {
        // Call the API
        const response = await fetch('https://course-api.com/react-tours-project');
        
        // If response isn’t OK (200), throw an error
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }

        // Convert response to JSON
        const data = await response.json();

        // Save the tour data to state
        setTours(data);

        // Turn off loading
        setLoading(false);
      } catch (err) {
        // If an error happens, show error message
        console.error('Failed to fetch tours:', err);
        setError(true);
        setLoading(false);
      }
    };

    // Call the fetch function
    fetchTours();
  }, []); // Empty array = only runs on first load

  // If data is still loading, show loading message
  if (loading) {
    return <h2>Loading...</h2>;
  }

  // If an error occurred, show a fallback error message
  if (error) {
    return <h2>Oops! There was a problem loading the tours.</h2>;
  }

  // Once data is loaded, show it (for now we just dump it as raw JSON)
  return (
    <main>
      <h1>Tour Gallery</h1>
      <div>
        {/* Later, this will be replaced with the Gallery component */}
        {/* <Gallery tours={tours} /> */}
        <pre>{JSON.stringify(tours, null, 2)}</pre> {/* Temporary debug view */}
      </div>
    </main>
  );
}

export default App;


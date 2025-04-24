import React from 'react';
import TourCard from './TourCard';

// Gallery receives the list of tours and the remove function from App.jsx
function Gallery({ tours, onRemove }) {
  return (
    <section className="gallery">
      {/* Loop through the tours and render a TourCard for each one */}
      {tours.map((tour) => (
        <TourCard
          key={tour.id}
          tour={tour}
          onRemove={onRemove}
        />
      ))}
    </section>
  );
}

export default Gallery;

import React from 'react';
import './TourCard.css'; // Optional: link to CSS file if you're styling the cards

// This component takes in two props:
// - tour: the data object for a single tour
// - onRemove: a function that removes this tour when "Not Interested" is clicked
function TourCard({ tour, onRemove }) {
  // Destructure the properties from the tour object
  const { id, name, info, image, price } = tour;

  return (
    <article className="tour-card">
      {/* Tour image */}
      <img src={image} alt={name} className="tour-img" />

      <footer>
        {/* Title and price */}
        <div className="tour-info">
          <h4>{name}</h4>
          <h4 className="tour-price">${price}</h4>
        </div>

        {/* Description text */}
        <p>{info}</p>

        {/* Button to remove this tour from the list */}
        <button
          className="btn not-interested"
          onClick={() => onRemove(id)}
        >
          Not Interested
        </button>
      </footer>
    </article>
  );
}

export default TourCard;

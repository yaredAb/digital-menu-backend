import React, { useState } from 'react';
import './MenuItem.css';

function MenuItem({ item }) {
  const [expanded, setExpanded] = useState(false);

  if (!item.visible) return null;

  return (
    <div className="menu-item" onClick={() => setExpanded(!expanded)}>
      <img src={item.image} alt={item.name} className="menu-image" />
      <h3>{item.name}</h3>

      {expanded && (
        <div className="menu-details">
          <p><strong>Description:</strong> {item.description}</p>
          <p><strong>Ingredients:</strong> {item.ingredients}</p>
        </div>
      )}
    </div>
  );
}

export default MenuItem;

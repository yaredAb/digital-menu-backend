import React, { useEffect, useState } from 'react';
import MenuItem from './components/MenuItem';
import './App.css';

function App() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch('https://digital-menu-1-3i80.onrender.com/api/menu')
      .then(res => res.json())
      .then(data => setMenuItems(data))
      .catch(err => console.error('Failed to fetch menu:', err));
  }, []);

  return (
    <div className="page-wrapper">
      <div class="logo-section">
          <a className="logo">Akko <span>Coffee</span></a>
          <h3 className="moto">ከአያቶቼ ምድር!</h3>
      </div>
      <div className="menu-section">
        <div className="menu-list">
          {menuItems.map(item => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

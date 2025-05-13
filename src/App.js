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
      <a className="logo">Meskott</a>
      <p className='title'>Menu</p>
      <div className='main-section'>
        <div className='filter-section'>
          <input type='text' placeholder='search...' />
          <div className='categories'>
            <button>food</button>
            <button>Drink</button>
          </div>
        </div>
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

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MenuItem from './components/MenuItem';
import './App.css';
import AddMenuItem from './components/AddMenuItem';

function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetch('https://digital-menu-1-3i80.onrender.com/api/menu')
      .then(res => res.json())
      .then(data => setMenuItems(data))
      .catch(err => console.error('Failed to fetch menu:', err));


      //fetch categories
      fetch('https://digital-menu-1-3i80.onrender.com/api/category')
        .then(res => res.json())
        .then(data => setCategories(data))
        .catch(err =>console.error('failed to fetch category', err))
  }, []);

  const filterMenuItems = selectedCategory ? menuItems.filter(item => item.category === selectedCategory) : menuItems

  return (
    <Router>
      <Routes>
        <Route path='/' element={<MenuPage />} />
        <Route path='/admin' element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;

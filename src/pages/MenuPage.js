import React from 'react'
import MenuItem from '../components/MenuItem'
import { useEffect, useState } from 'react';

export default function MenuPage() {

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
    <div className="page-wrapper">
      <a className="logo">Meskott</a>
      <p className='title'>Menu</p>
      <a href="/admin" className="admin-link">Admin</a>
      <div className='main-section'>
        <div className='filter-section'>
          <input type='text' placeholder='search...' />
          <div className='categories'>
            <button onClick={() => setSelectedCategory('')}>All</button>
            {categories.map(category => (
              <button key={category.id} onClick={() => setSelectedCategory(category.name)}>{category.name}</button>
            ))}
          </div>
        </div>

        {/* <AddMenuItem onItemAdded={(newItem) => setMenuItems(prev => [...prev, newItem])} /> */}
        <div className="menu-list">
          {filterMenuItems.map(item => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

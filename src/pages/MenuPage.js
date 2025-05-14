import React from 'react'
import MenuItem from '../components/MenuItem'
import { useEffect, useState } from 'react';

export default function MenuPage() {

  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('')

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

  const filterMenuItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    const matchSearch = item.name.toLowerCase().includes(searchTerm) ||
      item.name.toLowerCase().includes(searchTerm);

      return item.visible && matchesCategory && matchSearch
  })

  // const filterMenuItems = selectedCategory ? menuItems.filter(item => item.category === selectedCategory) : menuItems

  const handleSearchChane = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  }


  return (
    <div className="page-wrapper">
      <a className="logo">Meskott</a>
      <p className='title'>Menu</p>
      <div className='main-section'>
        <div className='filter-section'>
          <input type='text' placeholder='search...' value={searchTerm} onChange={handleSearchChane}/>
          <div className='categories'>
            <button onClick={() => setSelectedCategory('')}>All</button>
            {categories.map(category => (
              <button key={category.id} onClick={() => setSelectedCategory(category.name)}>{category.name}</button>
            ))}
          </div>
        </div>


        <div className="menu-list">
          {filterMenuItems.map(item => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

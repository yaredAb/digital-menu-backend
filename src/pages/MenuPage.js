import React from 'react'
import MenuItem from '../components/MenuItem'

export default function MenuPage() {
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

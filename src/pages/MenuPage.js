import React from 'react'
import MenuItem from '../components/MenuItem'
import { useEffect, useState } from 'react';

export default function MenuPage() {

  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try{
        setLoading(true)
        const [menuRes, categoryRes] = await Promise.all([
          fetch('https://digital-menu-1-3i80.onrender.com/api/menu'),
          fetch('https://digital-menu-1-3i80.onrender.com/api/category')
        ]);

        const menuData = await menuRes.json();
        const categoryData = await categoryRes.json();

        setMenuItems(menuData)
        setCategories(categoryData)
      } catch (err) {
        console.error('Fetch error: ', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData();
  }, [])

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
    <div class="w-full h-screen bg-white px-3 py-7 flex flex-col gap-5">
      <div class="flex items-center gap-3">
            <div class="bg-black rounded-full p-2">
                <img src="/img/rest.png" alt="logo" class="w-16" />
            </div>
            <a href="#" class="text-4xl font-semibold">Menu</a>
        </div>
        <div class="border border-gray-400 flex items-center rounded-full py-1 px-2">
            <img src="img/search_dark.png" alt="" />
            <input type="search" name="search" class="w-full p-1 focus:outline-none text-lg " placeholder="Search..." value={searchTerm} onChange={handleSearchChane}/>
        </div>
        <div className='flex overflow-x-auto gap-2 h-12'>
          <button onClick={() => setSelectedCategory('')} className={`${selectedCategory === '' ? 'border-2 border-black' : ''} px-5 rounded-full text-lg`}>All</button>
          {categories.map(category => (
            <button key={category.id} onClick={() => setSelectedCategory(category.name)} className={`${selectedCategory === category.name ? 'border-2 border-black' : ''}bg-slate-200 px-5 rounded-full text-lg`}>{category.name}</button>
          ))}
        </div>
          
          { loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading menu...</p>
            </div>
          ) : (
          <div class="h-full overflow-y-auto py-1">
            <div class="grid grid-cols-2 gap-2">
              {filterMenuItems.map(item => (
              <MenuItem key={item.id} item={item} />
              ))}
            </div>
          </div>
          )            
          }
      </div>
  )
}

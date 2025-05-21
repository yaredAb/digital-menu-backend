import React, { useEffect, useState } from 'react';
import './AdminPage.css'; // create styles here if needed

function AdminPage() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    ingredients: '',
    category: '',
    price: ''
  });

  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [imageFile, setImageFile] = useState(null)
  const [editingItemId, setEditingItemId] = useState(null)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('https://digital-menu-1-3i80.onrender.com/api/menu')
      .then(res => res.json())
      .then(setMenuItems)
      .catch(console.error);

    fetch('https://digital-menu-1-3i80.onrender.com/api/category')
      .then(res => res.json())
      .then(setCategories)
      .catch(console.error);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0])
  }

  const handleEdit = (item) => {
    setForm({
      name: item.name,
      description: item.description || '',
      ingredients: item.ingredients || '',
      category: item.category,
      price: item.price
    })
    setEditingItemId(item._id)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append('name', form.name)
    payload.append('description', form.description)
    payload.append('ingredients', form.ingredients)
    payload.append('price', form.price)
    payload.append('category', form.category)

    if(imageFile) {
        payload.append('image', imageFile)
    }  


    try {
      const url = editingItemId 
        ? `https://digital-menu-1-3i80.onrender.com/api/menu/${editingItemId}` 
        : 'https://digital-menu-1-3i80.onrender.com/api/menu';

      const method = editingItemId ? 'PUT' : 'POST'
      
      

      const res = await fetch(url, {
        method,
        body: payload
      });

      const result = await res.json();
      if (res.ok) {
        alert('Item added');
        fetchData();
        setForm({
          name: '',
          description: '',
          ingredients: '',
          category: '',
          price: ''
        });
        setImageFile(null)
        setEditingItemId(null)
      } else {
        alert(`Failed: ${result.message}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleVisibility = async (id) => {
    await fetch(`https://digital-menu-1-3i80.onrender.com/api/menu/${id}/visibility`, {
      method: 'PATCH'
    });
    fetchData();
  };

  const deleteItem = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this item?');
    if (!confirm) return;

    await fetch(`https://digital-menu-1-3i80.onrender.com/api/menu/${id}`, {
      method: 'DELETE'
    });
    fetchData();
  };

  return (
    <div className="admin-wrapper">
      <div class="flex items-center gap-3">
            <div class="bg-black rounded-full p-2">
                <img src="/img/rest.png" alt="logo" class="w-16" />
            </div>
            <a href="#" class="text-4xl font-semibold">Menu</a>
        </div>

      <div className="admin-content">
        {/* Form */}
        <form onSubmit={handleSubmit} className="admin-form" encType='multipart/form-data'>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input type="file" name="image" onChange={handleImageChange} required />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
          <input name="ingredients" placeholder="Ingredients (comma separated)" value={form.ingredients} onChange={handleChange} />
          <select name="category" value={form.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          <input name="price" placeholder="Price" type="number" value={form.price} onChange={handleChange} required />
          <button type="submit">{editingItemId ? 'Update Item' : 'Add Item'}</button>
        </form>
        {/* Table */}
        <div className='table-container'>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Ingredients</th>
                <th>Price</th>
                <th>Visible</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map(item => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.ingredients}</td>
                  <td>{item.price} Birr</td>
                  <td>{item.visible ? 'Yes' : 'No'}</td>
                  <td className='actions'>
                  <button className='editBtn' onClick={() => handleEdit(item)}>Edit</button>
                    <button onClick={() => toggleVisibility(item._id)} className='visible'>
                      {item.visible ? 'Hide' : 'Show'}
                    </button>
                    <button onClick={() => deleteItem(item._id)} className='deleteBtn'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;

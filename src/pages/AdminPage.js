import React, { useEffect, useState } from 'react';
import './AdminPage.css'; // create styles here if needed

function AdminPage() {
  const [form, setForm] = useState({
    name: '',
    image: '',
    description: '',
    ingredients: '',
    category: '',
    price: ''
  });

  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      ingredients: form.ingredients.split(',').map(i => i.trim()),
      price: parseFloat(form.price),
    };

    try {
      const res = await fetch('https://digital-menu-1-3i80.onrender.com/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await res.json();
      if (res.ok) {
        alert('Item added');
        fetchData();
        setForm({
          name: '',
          image: '',
          description: '',
          ingredients: '',
          category: '',
          price: ''
        });
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
      <a href='/' className='logo'>Meskott</a>
      <p className='title'>Admin Panel</p>

      <div className="admin-content">
        {/* Form */}
        <form onSubmit={handleSubmit} className="admin-form">
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
          <input name="ingredients" placeholder="Ingredients (comma separated)" value={form.ingredients} onChange={handleChange} />
          <select name="category" value={form.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          <input name="price" placeholder="Price" type="number" value={form.price} onChange={handleChange} required />
          <button type="submit">Add Item</button>
        </form>
        {/* Table */}
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
                <td>{item.ingredients?.join(', ')}</td>
                <td>{item.price} Birr</td>
                <td>{item.visible ? 'Yes' : 'No'}</td>
                <td>
                  <button onClick={() => toggleVisibility(item._id)}>
                    {item.visible ? 'Hide' : 'Show'}
                  </button>
                  <button onClick={() => deleteItem(item._id)} style={{ color: 'red' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPage;

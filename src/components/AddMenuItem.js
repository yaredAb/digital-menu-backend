import {useState, useEffect} from 'react'

function AddMenuItem({ onItemAdded }) {
    const [form, setForm] = useState({
        name: '',
        description: '',
        ingredients: '',
        category: '',
        price: '',
    })

    
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('https://digital-menu-1-3i80.onrender.com/api/category')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error("Faied to fetch categories", err))
    }, [])

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        
        try {
            const response = await fetch('https://digital-menu-1-3i80.onrender.com/api/menu', {
                method: 'POST',
                body: payload
            })

            const result = await response.json()
            if(response.ok) {
                alert('item added')
                onItemAdded(result)
                setForm({
                    name: '',
                    description: '',
                    ingredients: '',
                    category: '',
                    price: ''
                })
                setImageFile(null)
            } else {
                alert(`Failed: ${result.message}`)
            }
        } catch (err) {
            console.error('Error submitting item', err)
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{ margin: '1rem 0' }}>
            <h3>Add Menu Item</h3>
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
            
            <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
            <input name="ingredients" placeholder="Ingredients (comma separated)" value={form.ingredients} onChange={handleChange} />
            <select name="category" value={form.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            {categories.map(cat => (
                <option key={cat.id || cat._id} value={cat.name}>{cat.name}</option>
            ))}
            </select>
            <input name="price" placeholder="Price" type="number" value={form.price} onChange={handleChange} required />
            <button type="submit">Add Item</button>
      </form>
    )
}

export default AddMenuItem;
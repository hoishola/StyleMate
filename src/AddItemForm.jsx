import { useState } from 'react'
import styles from './Wardrobe.module.css'

export const AddItemForm = ({ onAdd, onError }) => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Tops')
  const [color, setColor] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const trimmedName = name.trim()
    const trimmedColor = color.trim()
    const trimmedImageUrl = imageUrl.trim()

    if (!trimmedName || !trimmedColor || !trimmedImageUrl) {
      onError('Please fill in all fields.')
      return
    }

    onAdd({
      id: Date.now(),
      name: trimmedName,
      category,
      color: trimmedColor,
      imageUrl: trimmedImageUrl,
      favorite: false,
    })

    setName('')
    setCategory('Tops')
    setColor('')
    setImageUrl('')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item name"
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Tops">Tops</option>
        <option value="Bottoms">Bottoms</option>
        <option value="Shoes">Shoes</option>
        <option value="Outerwear">Outerwear</option>
        <option value="Accessories">Accessories</option>
      </select>

      <input
        value={color}
        onChange={(e) => setColor(e.target.value)}
        placeholder="Color"
      />

      <input
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL"
      />

      <button className={styles.addButton} type="submit">Add Item</button>
    </form>
  )
}
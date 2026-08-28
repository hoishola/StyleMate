import { useState } from 'react'
import styles from './Wardrobe.module.css'

export const WardrobeGrid = ({ items, onDelete, onToggleFavorite, selectedForOutfit, onToggleSelectForOutfit, onUpdateItem }) => {
  const [editingId, setEditingId] = useState(null)
  const [editName, setEditName] = useState('')
  const [editCategory, setEditCategory] = useState('Tops')
  const [editColor, setEditColor] = useState('')
  const [editImageUrl, setEditImageUrl] = useState('')

  const startEditing = (item) => {
    setEditingId(item.id)
    setEditName(item.name)
    setEditCategory(item.category)
    setEditColor(item.color)
    setEditImageUrl(item.imageUrl)
  }

  const saveEdit = (id) => {
    const trimmedName = editName.trim()
    const trimmedColor = editColor.trim()
    const trimmedImageUrl = editImageUrl.trim()

    if (trimmedName && trimmedColor && trimmedImageUrl) {
      onUpdateItem(id, {
        name: trimmedName,
        category: editCategory,
        color: trimmedColor,
        imageUrl: trimmedImageUrl,
      })
    }
    setEditingId(null)
  }

  if (items.length === 0) {
    return <p className={styles.emptyState}>Your closet's empty — add your first item above!</p>
  }

  return (
    <ul className={styles.grid}>
      {items.map((item) => (
        <li className={styles.card} key={item.id}>
          {editingId === item.id ? (
            <div className={styles.editCard}>
              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Item name"
              />
              <select value={editCategory} onChange={(e) => setEditCategory(e.target.value)}>
                <option value="Tops">Tops</option>
                <option value="Bottoms">Bottoms</option>
                <option value="Shoes">Shoes</option>
                <option value="Outerwear">Outerwear</option>
                <option value="Accessories">Accessories</option>
              </select>
              <input
                value={editColor}
                onChange={(e) => setEditColor(e.target.value)}
                placeholder="Color"
              />
              <input
                value={editImageUrl}
                onChange={(e) => setEditImageUrl(e.target.value)}
                placeholder="Image URL"
              />
              <div className={styles.outfitEditRow}>
                <button onClick={() => saveEdit(item.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <img src={item.imageUrl} alt={item.name} />
              <div className={styles.cardInfo}>
                <p>{item.name}</p>
                <p>{item.category}</p>
              </div>
              <div className={styles.cardActions}>
                <button className={styles.favoriteButton} onClick={() => onToggleFavorite(item.id)}>
                  {item.favorite ? '★' : '☆'}
                </button>
                <button className={styles.editButton} onClick={() => startEditing(item)}>✏️</button>
                <button className={styles.deleteButton} onClick={() => onDelete(item.id)}>Delete</button>
              </div>

              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selectedForOutfit.includes(item.id)}
                  onChange={() => onToggleSelectForOutfit(item.id)}
                />
                Add to Outfit
              </label>
            </>
          )}
        </li>
      ))}
    </ul>
  )
}
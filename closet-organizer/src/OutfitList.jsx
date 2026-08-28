import { useState } from 'react'
import styles from './Wardrobe.module.css'

export const OutfitList = ({ outfits, wardrobe, onDelete, onRename }) => {
  const [editingId, setEditingId] = useState(null)
  const [editName, setEditName] = useState('')

  const startEditing = (outfit) => {
    setEditingId(outfit.id)
    setEditName(outfit.name)
  }

  const saveRename = (id) => {
    const trimmed = editName.trim()
    if (trimmed) {
      onRename(id, trimmed)
    }
    setEditingId(null)
  }

  return (
    <div className={styles.outfitSection}>
      <h3>Saved Outfits</h3>

      {outfits.length === 0 ? (
        <p>No outfits saved yet.</p>
      ) : (
        outfits.map((outfit) => {
          const items = wardrobe.filter((item) => outfit.itemIds.includes(item.id))

          return (
            <div className={styles.outfitCard} key={outfit.id}>
              {editingId === outfit.id ? (
                <div className={styles.outfitEditRow}>
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  <button onClick={() => saveRename(outfit.id)}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              ) : (
                <div className={styles.outfitEditRow}>
                  <h4>{outfit.name}</h4>
                  <button className={styles.editButton} onClick={() => startEditing(outfit)}>✏️</button>
                  <button className={styles.deleteButton} onClick={() => onDelete(outfit.id)}>Delete</button>
                </div>
              )}

              <ul className={styles.outfitItems}>
                {items.map((item) => (
                  <li key={item.id}>
                    <img src={item.imageUrl} alt={item.name} />
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })
      )}
    </div>
  )
}
import { useState } from 'react'
import styles from './Wardrobe.module.css'

export const OutfitList = ({ outfits, wardrobe, onDelete, onUpdate }) => {
  const [editingId, setEditingId] = useState(null)
  const [editName, setEditName] = useState('')
  const [editItemIds, setEditItemIds] = useState([])

  const startEditing = (outfit) => {
    setEditingId(outfit.id)
    setEditName(outfit.name)
    setEditItemIds(outfit.itemIds)
  }

  const toggleEditItem = (id) => {
    if (editItemIds.includes(id)) {
      setEditItemIds(editItemIds.filter((itemId) => itemId !== id))
    } else {
      setEditItemIds([...editItemIds, id])
    }
  }

  const saveEdit = (id) => {
    const trimmed = editName.trim()
    if (trimmed && editItemIds.length > 0) {
      onUpdate(id, trimmed, editItemIds)
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
                <div>
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />

                  <p>Choose items:</p>
                  <ul className={styles.editItemList}>
                    {wardrobe.map((item) => (
                      <li key={item.id}>
                        <label>
                          <input
                            type="checkbox"
                            checked={editItemIds.includes(item.id)}
                            onChange={() => toggleEditItem(item.id)}
                          />
                          {item.name} ({item.category})
                        </label>
                      </li>
                    ))}
                  </ul>

                  <div className={styles.outfitEditRow}>
                    <button onClick={() => saveEdit(outfit.id)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </div>
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
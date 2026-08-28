import { useState } from 'react'
import styles from './Wardrobe.module.css'

export const OutfitBuilder = ({ selectedForOutfit, wardrobe, onSave, onError }) => {
  const [name, setName] = useState('')

  const selectedItems = wardrobe.filter((item) => selectedForOutfit.includes(item.id))

  const handleSubmit = (e) => {
    e.preventDefault()

    const trimmedName = name.trim()
    if (!trimmedName || selectedItems.length === 0) {
      onError('Pick some items and give your outfit a name.')
      return
    }

    onSave(trimmedName)
    setName('')
  }

  return (
    <div className={styles.outfitSection}>
      <h3>Build an Outfit</h3>

      {selectedItems.length === 0 ? (
        <p>Select items from your wardrobe to add here.</p>
      ) : (
        <ul className={styles.selectedList}>
          {selectedItems.map((item) => (
            <li key={item.id}>{item.name} ({item.category})</li>
          ))}
        </ul>
      )}

      <form className={styles.outfitForm} onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Outfit name (e.g. Friday Dinner)"
        />
        <button className={styles.saveOutfitButton} type="submit">Save Outfit</button>
      </form>
    </div>
  )
}
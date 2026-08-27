import styles from './Wardrobe.module.css'
export const WardrobeGrid = ({ items, onDelete, onToggleFavorite, selectedForOutfit, onToggleSelectForOutfit }) => {
  if (items.length === 0) {
  return <p className={styles.emptyState}>Your wardrobe is waiting! Add your first item above to start building your collection.
</p>
}
  return (
    <ul className={styles.grid}>
      {items.map((item) => (
        <li className={styles.card} key={item.id}>
          <img src={item.imageUrl} alt={item.name} />
          <div className={styles.cardInfo}>
            <p>{item.name}</p>
            <p>{item.category}</p>
          </div>
          <div className={styles.cardActions}>
            <button className={styles.favoriteButton} onClick={() => onToggleFavorite(item.id)}>
              {item.favorite ? '★' : '☆'}
            </button>
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
        </li>
      ))}
    </ul>
  )
}
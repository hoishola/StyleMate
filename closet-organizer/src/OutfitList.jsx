import styles from './Wardrobe.module.css'

export const OutfitList = ({ outfits, wardrobe }) => {
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
              <h4>{outfit.name}</h4>
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
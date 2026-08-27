import styles from './Wardrobe.module.css'

export const FilterBar = ({ currentFilter, onFilterChange }) => {
  const categories = ['All', 'Tops', 'Bottoms', 'Shoes', 'Outerwear', 'Accessories']

  return (
    <div className={styles.filterBar}>
      {categories.map((category) => (
        <button
          key={category}
          className={`${styles.filterButton} ${currentFilter === category ? styles.filterButtonActive : ''}`}
          onClick={() => onFilterChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
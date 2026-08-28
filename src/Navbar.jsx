import styles from './Wardrobe.module.css'

export const Navbar = ({ activeTab, onTabChange }) => {
  return (
    <nav className={styles.navbar}>
      <button
        className={`${styles.navButton} ${activeTab === 'wardrobe' ? styles.navButtonActive : ''}`}
        onClick={() => onTabChange('wardrobe')}
      >
        Wardrobe
      </button>
      <button
        className={`${styles.navButton} ${activeTab === 'about' ? styles.navButtonActive : ''}`}
        onClick={() => onTabChange('about')}
      >
        About
      </button>
    </nav>
  )
}
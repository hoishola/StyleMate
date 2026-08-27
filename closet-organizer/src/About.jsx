import styles from './Wardrobe.module.css'

export const About = () => {
  return (
    <div className={styles.aboutSection}>
      <h2>About StyleMate</h2>
      <p>StyleMate makes getting dressed easier. Catalog your wardrobe, organize your clothes by category, and create outfits using pieces you already own. Whether you're dressing for an event or just planning your everyday look, StyleMate helps you find the right outfit faster.</p>

      <h3>How it works</h3>
      <ol>
        <li>Add clothing items with a name, category, color, and photo</li>
        <li>Browse and filter your wardrobe by category</li>
        <li>Select multiple items and save them together as a named outfit</li>
        <li>Or hit "Generate Random Outfit" to get an instant suggestion</li>
      </ol>
    </div>
  )
}
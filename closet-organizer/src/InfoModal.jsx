import styles from './Wardrobe.module.css'

export const InfoModal = ({ message, onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <p>{message}</p>
        <div className={styles.modalActions}>
          <button className={styles.modalConfirm} onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  )
}
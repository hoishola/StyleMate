import styles from './Wardrobe.module.css'

export const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <p>{message}</p>
        <div className={styles.modalActions}>
          <button className={styles.modalCancel} onClick={onCancel}>Cancel</button>
          <button className={styles.modalConfirm} onClick={onConfirm}>Yes, delete</button>
        </div>
      </div>
    </div>
  )
}
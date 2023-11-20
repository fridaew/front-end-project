import React from 'react';
import styles from './DateSelectionModal.module.css'; 

const DateSelectionModal = ({ isOpen, onClose}) => {
  return (
    <div className={`${styles.modal} ${isOpen ? styles.modalOpen : ''}`}>
      <div className={styles.modalContent}>
        <p>Please select check-in and check-out dates before reserving.</p>
        <button onClick={onClose} className={styles.modal_btn}>Close</button>
      </div>
    </div>
  );
};

export default DateSelectionModal;
